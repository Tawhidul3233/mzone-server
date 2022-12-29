const express = require('express');
const app = express();
const port = process.env.PORT || 5000

const cors = require('cors');
app.use(cors());

require('dotenv').config()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(express.json());


const uri = `mongodb+srv://${process.env.MONGOBD_USERNAME}:${process.env.MONGOBD_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
     try{
          const postsCollections = client.db('mzone').collection('posts');
          const usersCollections = client.db('mzone').collection('users');

          // get all post data 
          app.get('/posts', async(req, res)=>{
               const queary = {}
               const result = await postsCollections.find(queary).toArray()
               res.send(result)
          })

          // get each data with id
          app.get('/postDetails/:id', async(req, res)=>{
               const id = req.params.id;
               const queary = {_id : ObjectId(id)}
               const result = await postsCollections.find(queary).toArray()
               res.send(result)
          })

          // get user information 
          app.get('/user', async (req, res)=>{
               const email = req.query.email;
               const queary = { email: email}
               const result = await usersCollections.find(queary).toArray()
               res.send(result)

          })


          // user information send to mongodb
          app.post('/users', async(req, res)=>{
               const user = req.body;
               const queary = {email: user.email}
               const cursor = await usersCollections.findOne(queary)
               if(cursor){
                    return;
               }
               const result = await usersCollections.insertOne(user)
               res.send(result)
          })

          // post all post data 
          app.post('/posts', async(req, res)=>{
               const post = req.body;
               const result = await postsCollections.insertOne(post)
               res.send(result)
          })

     }
     finally{

     }
}
run().catch(err => console.log(err))



app.get('/', (req, res) => {
     res.send('Server runing')
})
app.listen(port, () => {
     console.log(`server runing ${port}`)
})
