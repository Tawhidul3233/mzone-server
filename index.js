const express = require('express');
const app = express();
const port = process.env.PORT || 5000

const cors = require('cors');
app.use(cors());

require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());


const uri = `mongodb+srv://${process.env.MONGOBD_USERNAME}:${process.env.MONGOBD_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
     try{
          const postsCollections = client.db('mzone').collection('posts');


          app.post('/posts', async(req, res)=>{
               const data = req.body;
               const result = await postsCollections.insertOne(data)
               res.send(result)
               console.log(data)
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
