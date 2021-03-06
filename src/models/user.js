const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

///USER SCHEMA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String, 
    required: true,
    trim: true,
    validate(value) {
      if(value.length < 6) {
        throw new Error('Password must be 6 or more characters')
      } else if(value.includes('password')) {
        throw new Error('Cannot include the word password')
      }
    }
  },
  email: {
    type:String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]

})


userSchema.virtual('tasks', {
  ref: 'Tasks',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id:user._id.toString() }, 'thisismynewcourse')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if(!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User












// //Create User
// const user = new User({
//   name: 'Emir',
//   age: 33,
//   email: 'emirmartinez@gmail.com',
//   password: 'codingbootcamp'
// })

// //Save User
// user.save().then(() => {
//   console.log(user)
// }).catch((error) => {
//   console.log('Error', error)
// })

