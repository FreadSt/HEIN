const jwt = require("jsonwebtoken")
const UserDto = require("../src/domain/dto/UserDto");
const ValidationError = require("../src/domain/validation/ValidationError")

module.exports.register = async (req, res, next) => {
  try {
    const dto = UserDto.fromRequestBody(req.body)
    const existingUser = await req.database.models.Users.findOne({where: {username: dto.username}})
    if (existingUser) {
      res.status(400).json({message: "User already exists"})
      next()
      return
    }
    await req.database.models.Users.create(dto)
    res.status(201)
    next()
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400).json({message: e.message})
      next()
    } else {
      res.status(500)
      console.log(e)
      next()
    }
  }
}

module.exports.login = (req, res, next) => { // TODO Use sequelize
  const username = req.body.username
  const password = req.body.password
  let user
  User.findOne({username})
    .then(foundUser => {
      !foundUser && res.status(400).json({
        message: 'Username is not valid!'
      })
      user = foundUser
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
      !isEqual && res.status(400).json({
        message: 'Password is not correct!'
      })
      // Generate the JWT
      const token = jwt.sign({
        id: user._id.toString(), isAdmin: user.isAdmin
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
      })
      res.status(200).json({
        message: 'User is logined successfully.', token, userId: user._id.toString(), isAdmin: user.isAdmin
      })
    })
    .catch(error => {
      res.status(500).json(error)
    })
}
