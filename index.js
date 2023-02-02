const express = require('express')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');


require('dotenv').config()

const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

const uri = `mongodb://mohid:m0EK5JN4EzQnQwpP@ac-c1hfgxl-shard-00-00.7o5d5sd.mongodb.net:27017,ac-c1hfgxl-shard-00-01.7o5d5sd.mongodb.net:27017,ac-c1hfgxl-shard-00-02.7o5d5sd.mongodb.net:27017/?ssl=true&replicaSet=atlas-446w00-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        await client.connect()
        console.log('connected')
        const correctionsCollection = client.db('Knowledge').collection('correction')

     
        app.post('/correction', async (req, res) => {
            const correction = req.body;
            const result = await correctionsCollection.insertOne(correction);
            res.send(result);
      
          })
          app.get('/corrections', async (req, res) => {
            const correction = await correctionsCollection.find().toArray()
            res.send(correction)
          })

          app.delete('/deleteOrder/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(filter);
            res.send(result);
        })
    } finally {

    }

}


run().catch(console.dir)



app.get('/', async (req, res) => {
    res.send('This is first deployment in heroku')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})








