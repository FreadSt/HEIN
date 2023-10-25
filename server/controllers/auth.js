const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports.register = async (req, res, next) => {
  try {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin || false
    });
    await user.save();
    const token = jwt.sign({
      id: user._id.toString(),
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
    res.status(201).json({
      userId: user._id.toString(),
      token,
      username: user.username
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let user;
  User.findOne({username})
    .then(foundUser => {
      !foundUser && res.status(400).json({
        message: 'Username is not valid!'
      });
      user = foundUser;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      !isEqual && res.status(400).json({
        message: 'Password is not correct!'
      });
      // Generate the JWT
      const token = jwt.sign(
        {
          id: user._id.toString(),
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1d'
        }
      );
      res.status(200).json({
        message: 'User is logined successfully.',
        token,
        userId: user._id.toString(),
        username: user.username,
        isAdmin: user.isAdmin
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
