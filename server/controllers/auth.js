const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports.register = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      username: req.body.username, email: req.body.email, password: hash, isAdmin: req.body.isAdmin || false
    });
    await user.save();
    const token = jwt.sign({
      id: user._id.toString(), isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
    res.status(201).json({
      userId: user._id.toString(), token, username: user.username
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      res.status(400).json({
        message: 'Credentials provided are not correct.'
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({
        message: 'Credentials are not correct.'
      });
      return;
    }

    const token = jwt.sign({
      id: user._id.toString(), isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d'
    });

    res.status(200).json({
      token, userId: user._id.toString(), username: user.username, isAdmin: user.isAdmin
    });

  } catch (e) {
    res.status(500).json(e);
  }
};
