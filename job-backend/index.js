const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-project.lyrz8.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-project`;

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

    // DB and Collections
    const db = client.db("jobportalproject");
    const jobCollections = db.collection("somejobs");

    // Posting a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      const result = await jobCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Try again later",
          status: false,
        });
      }
    });

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobCollections.find({}).toArray();
      res.send(jobs);
    });

    // Get a job by ID
    app.get("/all-jobs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const job = await jobCollections.findOne({ _id: new ObjectId(id) });

        if (job) {
          res.send(job);
        } else {
          res.status(404).send({ message: "Job not found" });
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // Get all jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      const email = req.params.email;
      const jobs = await jobCollections.find({ email }).toArray();
      res.send(jobs);
    });

    // Delete a job by ID
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobCollections.deleteOne(filter);

      if (result.deletedCount === 1) {
        res.status(200).send({ message: "Job deleted successfully" });
      } else {
        res.status(404).send({ message: "Job not found" });
      }
    });

    // Confirm MongoDB connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

  // Start the server
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
