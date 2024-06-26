const express = require('express')
const app = express()
const port = process.env.PORT || 5004
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// middileware
app.use(cors())
app.use(express.json())

// nafisahamed200429
// YvP09DxqHC8uxOnD


const uri = "mongodb+srv://nafisahamed200429:YvP09DxqHC8uxOnD@cluster0.f8w8siu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    
    const userCollection = client.db('usersDB').collection('users')

    app.get('/users',async(req,res)=>{
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result);
  })

   app.get('/users/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const uss = await userCollection.findOne(query)
        res.send(uss)
   })
    
    app.post('/users',async(req,res)=>{
        const user = req.body 
        console.log('new user',user);
        const result = await userCollection.insertOne(user)
        res.send(result)
        
    })

    app.put('/users/:id', async(req,res)=>{
       const id = req.params.id
       const User = req.body
       console.log(User);
       const filter = {_id:new ObjectId(id)}
       const options = {upsert: true}

       const updateUser = {
          $set:{
             email: User.email
          }
       }
       const result = await userCollection.updateOne(filter, updateUser,options)
       res.send(result)
      
    })

    app.delete('/users/:id', async(req,res)=>{
        const id = req.params.id
        console.log('please delete from database',id)
        const query = {_id : new ObjectId(id)}
        const result = await userCollection.deleteOne(query)
        res.send(result)
   })

    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.log);





app.get('/', (req, res) => {
    res.send('Hello World! it s me how are you')
  })



  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

