const express = require('express')
const { MongoClient, Collection } = require('mongodb');
require('dotenv').config();


const app = express()
const ObjectId = require('mongodb').ObjectId;
const email = require('mongodb').email;
const port = process.env.PORT || 5000;
const cors = require('cors');
var bodyParser = require('body-parser');


app.use(cors())
app.use(express.json())
// const db = require('db')
// db.connect({
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbopj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//console.log(uri);
//MONGODB OPERATIONS----******-------


async function run() {
    try {
      await client.connect();
      const database = client.db("TeslaHcDB");
      const userDataCollection = database.collection("TeslaUsersData");
      // create a document to insert
      app.get('/usersOutput', async (req, res) => {

       const result = userDataCollection.find({});
      const users = await result.toArray()
      res.send(users)
      })

      //Post A Document to Data base
      app.post("/userInput",async(req,res)=>
      {
        const newUser = req.body;
        console.log('Send to DB',req.body);
        const result = await userDataCollection.insertOne(newUser);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.json(result)
      })

      //Get A Document

      
     app.get('/userOutput/:email',async(req,res)=>
     {
        const index = req.params.email;
      console.log(index);
      
       //const quary = { _id: ObjectId(index)}
       const quary = { email : email(index) }
       const students= studentDataCollection.findOne(quary);
       const result = await students.toArray(students)
      res.send(result)
      // console.log(students);
     })

     
    //   const result = await user.insertOne(doc);
     // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
     // await client.close();
    }
  }
  run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Tesla Health-Care')
  })

app.post('/')
  
  app.listen(port, () => {
    console.log(`Tesla app listening at http://localhost:${port}`)
  })