const mongoose = require('mongoose')

/// TASK SCHEMA
const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})


module.exports = Tasks

// //create tast 
// const task = new Tasks ({
//   description: '     Have dinner',
//   completed: 'true
// })

// //Save task and promise
// task.save().then(() => {
//   console.log(task)
// }).catch((error) => {
//   console.log(error)
// })
