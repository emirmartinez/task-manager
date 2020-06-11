const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/tasks')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//  if(req.method === 'GET'){
//   res.send('GET request are disabled')
//  } else {
//    next()
//  }
// })

// app.use((req, res, next) => {
//     res.status(503).send('503 Under Maintance')
// })  

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => [
  console.log('Server is up on port ' + port)
])

const Task = require('./models/tasks')

const main = async () => {
  // const task = await Task.findById('5ed870b36a00a346e6692d10')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)

const user = await User.findById('5ed86f6687565f461e6106cb')
await user.populate('tasks').execPopulate()
console.log(user.tasks)
}

main()

