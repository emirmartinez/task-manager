const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// //Post api, post user to database using async
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(error)
  }
})
// Login user 
router.post('/users/login', async (req, res) => {
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch(error) {
    res.status(400).send()
  }
})

// Logout user single session
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error){
    res.status(500).send()
  }
})

//Logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error){
    res.status(500).send()
  }
})


// //Get api, gets all users from database using async
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})
 
// //Patch api, edits user by id from database using async
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidOperation) {
    return res.status(400).send({error: 'Invalid update'})
  }
  try {
   updates.forEach((update) => {
      req.user[update] = req.body[update]
    })
    await req.user.save()
    
    res.send(req.user)
 } catch (error) {
    res.status(400).send(error)
  }
})

// //Delete api, delete user by id from database using async
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router











// // Post api, post user to database using promise
// app.post('/users', (req, res) => {
//   const user = new User(req.body)

//   user.save().then(() => {
//     res.status(201).send(user)
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })

// //Get api, gets all users from database using promises
// app.get('/users', (req, res) => {
//   User.find({}).then((users) => {
//     res.send(users)
//   }).catch((error) => {
//     res.status(500).send()
//   })
// })

// //Get api, gets user by id from database using promises
// app.get('/users/:id', (req, res) => {
//   const _id = req.params.id
//   User.findById(_id).then((user) => {
//     if(!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   }).catch(() => {
//     res.status(500).send()
//   })
// })