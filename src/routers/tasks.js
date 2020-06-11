const express = require('express')
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')
const router = new express.Router()

// //Post api, post task to database using async
router.post('/tasks', auth, async (req, res) => {

  const task = new Tasks({
    ...req.body,
    owner: req.user._id
  })

   try {
    await task.save()
    res.status(201).send(task)
   } catch (error) {
     res.status(400).send(error)
   }
  })
  
  // //Get api, gets all tasks from database using async
  router.get('/tasks', auth, async (req, res) => {
    try {

      const task = await Tasks.find({ owner: req.user._id })
      res.status(200).send(task)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  
  // //Get api, gets task by id from database using async
  router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
      const task = await Tasks.findOne({ _id, owner: req.user._id })

      if (!task) {
        return res.status(404).send()
      }

      res.send(task)
    } catch (error) {
      res.status(500).send(error)
    }
  })
  
  // //Patch api, edits task by id from database using async
  router.patch('/tasks/:id', auth, async (req, res) => {
    const id = req.params.id
    const update = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))
  
    if(!isValidOperation) {
      return res.status(400).send({error: 'Invalid update'})
    }
  
    try {
      const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id})

      if(!task){
        return res.status(404).send()
      }

      update.forEach((update) => task[update] = req.body[update] )
      await task.save()

      res.send(task)
    } catch(error) {
      res.status(400).send(error)
    }
  })
  
  // //Delete api, delete task by id from database using async
  router.delete('/tasks/:id', async (req, res) => {
    try {
      const task = await Tasks.findByIdAndDelete(req.params.id)
      if (!task){
        return res.status(404).send()
      }
      res.send(task)
    } catch (error) {
      res.status(500).send()
    }
  })

  module.exports = router








  


  
  // Post api, post task to database using promises
// app.post('/tasks', (req, res) => {
//   const task = new Tasks (req.body)

//   task.save().then(() => {
//     res.status(201).send(task)
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })

 // //Get api, gets all tasks from database using promises
  // app.get('/tasks', (req, res) => {
  //   Tasks.find({}).then((tasks) => {
  //     res.status(400).send(tasks)
  //   }).catch((error) => {
  //     res.status(500).send()
  //   })
  // })

   // //Get api, gets task by id from database using promises
  // app.get('/tasks/:id', (req, res) => {
  //   const _id = req.params.id
  
  //   Tasks.findById(_id).then((task) => {
  //     if(!task) {
  //       return res.status(404).send()
  //     }
  //     res.status(200).send(task)
  //   }).catch((error) => {
  //     res.status(500).send()
  //   })
  // })
  