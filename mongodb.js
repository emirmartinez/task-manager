//CRUD Creat, Read, Update, Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjedtID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName)

 db.collection('tasks').deleteOne({
   description: 'Take out the trash'
 }).then((result) => {
  console.log(result)
 }).catch((error) => {
  console.log(error)
 })
})




///******  CREATE    *******///

      ///INSERTONE
// db.collection('users').insertOne({
  //   _id: id,
  //   name: "Emir",
  //   age: 33
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user')
  //   }
  //   console.log(result.ops)
  // })

      ////INSERTMANY EXAMPLE ONE
  // db.collection('users').insertMany([
  //   {
  //     name: 'Jen', age: 28
  //   }, 
  //   {
  //     name: 'Gunther', age: 28
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log("unable to insert document")
  //   }
  //   console.log(result.ops)
  // })

        ////INSERTMANY EXAMPLE TWO
  // db.collection('tast').insertMany([
  //   {description: 'Take out the trash', completed: true},
  //   {description: 'Clean kitchen', completed: true},
  //   {description: 'Wash the bathroom', completed: false}
  // ], (error, result) => {
  //   if (error) {
  //     return console.log("unable to insert document")
  //   }
  //   console.log(result.ops)
  // })


///******  READ   *******///

        ///FIND ONE 
   // db.collection('users').findOne({_id: new ObjectID('5ecd4a9e8afd5292af9778fd')},(error, user) => {
  //   if(error) {
  //     return console.log('unable to fetch')
  //   }
  //   console.log(user)
  // })

      //FIND & RETURN ARRAY
  // db.collection('users').find({ age:33 }).toArray((error, users) => {
  //   console.log(users)
  // })

        ///FIND ONE 
  // db.collection('tast').findOne({_id: new ObjectID('5ecd4cc4ab7eaf93b3d5f79f')}, (error, task) => {
  //   if (error){
  //     return console.log("unable to fetch task")
  //   }
  //   console.log(task)
  // })

      //FIND & RETURN ARRAY
  // db.collection('tast').find({completed: false}).toArray((error, tasks) => {
  //   if (error) {
  //     return console.log('unable to find tasks')
  //   }
  //   console.log(tasks)
  // })



///******  UPDATE  *******///

    /// UPDATE ONE

  // const updatePromise = db.collection('users').updateOne({
  //   _id: new ObjectID('5ecb036b5bf43c8d2dbdbed1')
  // }, {
  //   $Set: {
  //     name: 'Johnny'
  //   }
  // })

  // updatePromise.then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

      /// UPDATE USING INCREMENT 

    //   const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5ecb036b5bf43c8d2dbdbed1')
    //   }, {
    //     $inc: {
    //       age: -1
    //     }
    //   })
    
    //   updatePromise.then((result) => {
    //     console.log(result)
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // })

        ///UPDATE MANY

      //   const updatePromise = db.collection('tasks').updateMany({
      //     completed: false
      // }, {
      //   $set: {
      //     completed: true
      //   }
      // })
    
      // updatePromise.then((result) => {
      //   console.log(result)
      // }).catch((error) => {
      //   console.log(error)
      // })


     
///******  DELETE   *******///

    //DELETE MANY

    // db.collection('users').deleteMany({
    //   age: 28
    // }).then((result) => {
    //  console.log(result)
    // }).catch((error) => {
    //  console.log(error)
    // })

    //DELETE ONE 

    // db.collection('tasks').deleteOne({
    //   description: 'Take out the trash'
    // }).then((result) => {
    //  console.log(result)
    // }).catch((error) => {
    //  console.log(error)
    // })







