const express = require("express");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
// Allow only specific URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://dawah.netlify.app",
  "https://dawah2.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb://mohid:m0EK5JN4EzQnQwpP@ac-c1hfgxl-shard-00-00.7o5d5sd.mongodb.net:27017,ac-c1hfgxl-shard-00-01.7o5d5sd.mongodb.net:27017,ac-c1hfgxl-shard-00-02.7o5d5sd.mongodb.net:27017/?ssl=true&replicaSet=atlas-446w00-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("connected");
    const correctionsCollection = client
      .db("Knowledge")
      .collection("correction");

    app.post("/post/create", async (req, res) => {
      const correction = req.body;
      const result = await correctionsCollection.insertOne(correction);
      res.send(result);
    });
    app.get("/post/getAllForUsers", async (req, res) => {
      const correction = await correctionsCollection.find().toArray();
      res.send(correction);
    });

    app.delete("/post/deleteByUsers/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await correctionsCollection.deleteOne(filter);
      res.send(result);
    });
    app.put("/post/update/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;

        const filter = { _id: ObjectId(id) };
        const updateDoc = {
          $set: updateData,
        };

        const result = await correctionsCollection.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Document not found" });
        }

        res.send({ message: "Document updated successfully", result });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating document", error });
      }
    });

    app.get("/post/get/", async (req, res) => {
      try {
        const id = req.params.id;
        const document = await correctionsCollection.findOne({
          _id: ObjectId(id),
        });

        if (!document) {
          return res.status(404).send({ message: "Document not found" });
        }

        res.send(document);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching document", error });
      }
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("This is first deployment in heroku");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
