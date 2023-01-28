const express = require('express')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');


require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7o5d5sd.mongodb.net/?retryWrites=true&w=majority`;
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
          app.get('/correction', async (req, res) => {
            const correction = await correctionsCollection.find().toArray()
            res.send(correction)
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








