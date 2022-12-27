const express = require('express');
const app = express();
const port = process.env.PORT || 5000

const cors = require('cors');
app.use(cors());

require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');






const uri = `mongodb+srv://${process.env.MONGOBD_USERNAME}:${process.env.MONGOBD_PASSWORD}@cluster0.kbyx5ha.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function run (){
     try{

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
