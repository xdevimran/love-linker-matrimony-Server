const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://b8a12.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// const uri =
//   "mongodb+srv://B8A12:4TkAdq6KMuIVodeM@cluster0.iitamdp.mongodb.net/?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://B8A12:4TkAdq6KMuIVodeM@cluster0.iitamdp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const biodataCollection = client.db("B8A12").collection("biodata");
    const favoriteCollection = client.db("B8A12").collection("favorite");
    const contactRequestCollection = client
      .db("B8A12")
      .collection("contactRequest");
    const usersCollection = client.db("B8A12").collection("users");
    const biodataprorequestCollection = client
      .db("B8A12")
      .collection("biodataprorequest");

    // Users Api section
    // Post new User to database
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    // Get all Users
    app.get("/user", async (req, res) => {
      const requests = await usersCollection.find(req.query).toArray();
      res.send(requests);
    });

    // Get single User
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });
    // Get User by email
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });
    // Update User
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedFood = req.body;
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedFood }
      );
      if (result.modifiedCount === 1) {
        res.send(`updatedFood with id ${id} updated successfully`);
      } else {
        res.status(404).send(`updatedFood with id ${id} not found`);
      }
    });

    // Delete User
    app.delete("/user/:id", async (req, res) => {
      const userId = req.params.id;
      const query = { _id: userId };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // Biodata Api section
    // Post new Biodata
    app.post("/biodata", async (req, res) => {
      const biodata = req.body;
      const result = await biodataCollection.insertOne(biodata);
      res.send(result);
    });

    // Get all Biodata
    app.get("/biodata", async (req, res) => {
      const requests = await biodataCollection.find(req.query).toArray();
      res.send(requests);
    });

    // Get single Biodata by id
    app.get("/biodata/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const biodata = await biodataCollection.findOne(query);
      res.send(biodata);
    });

    // Update Biodata by id
    app.put("/biodata/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const biodata = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: biodata,
      };
      const result = await biodataCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // update Biodata by email
    // app.put("/biodata/email/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const filter = { email: email }; // Assuming your email field in the database is named 'email'
    //   const biodata = req.body;
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: biodata,
    //   };

    //   try {
    //     const result = await biodataCollection.updateOne(
    //       filter,
    //       updateDoc,
    //       options
    //     );
    //     res.send(result);
    //   } catch (error) {
    //     res.status(500).send({ error: "Internal Server Error" });
    //   }
    // });

    // Delete Biodata
    app.delete("/biodata/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await biodataCollection.deleteOne(query);
      res.send(result);
    });

    // Biodata Premium request Api section
    // post new Biodata Premium request
    app.post("/biodataprorequest", async (req, res) => {
      const request = req.body;
      const result = await biodataprorequestCollection.insertOne(request);
      res.send(result);
    });

    // Get all Biodata Premium request
    app.get("/biodataprorequest", async (req, res) => {
      const requests = await biodataprorequestCollection
        .find(req.query)
        .toArray();
      res.send(requests);
    });

    // Get single Biodata Premium request
    app.get("/biodataprorequest/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const request = await biodataprorequestCollection.findOne(query);
      res.send(request);
    });
    // Update Biodata by id
    app.put("/biodataprorequest/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const biodata = req.body;
      const options = { upsert: true };
      const updateDoc = {
        $set: biodata,
      };
      const result = await biodataprorequestCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // Favorite Biodata Api section
    // Post new Favorite Biodata
    app.post("/favorite", async (req, res) => {
      const favorite = req.body;
      const result = await favoriteCollection.insertOne(favorite);
      res.send(result);
    });

    // Get single Favorite Biodata
    app.get("/favorite/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const favorite = await favoriteCollection.findOne(query);
      res.send(favorite);
    });

    // Get all Favorite Biodata
    app.get("/favorite", async (req, res) => {
      try {
        const favorites = await favoriteCollection.find().toArray();
        res.send(favorites);
      } catch (error) {
        console.error("Error getting all favorites:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // Delete single Favorite Biodata
    app.delete("/favorite/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await favoriteCollection.deleteOne(query);
      res.send(result);
    });

    // Contact Request Api section
    // Post new Contact Request
    app.post("/contactRequest", async (req, res) => {
      const contactRequest = req.body;
      const result = await contactRequestCollection.insertOne(contactRequest);
      res.send(result);
    });

    // Get all Contact Request
    app.get("/contactRequest", async (req, res) => {
      const requests = await contactRequestCollection.find(req.query).toArray();
      res.send(requests);
    });
    // delete single Contact Request
    app.delete("/contactRequest/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await contactRequestCollection.deleteOne(query);
      res.send(result);
    });

    // MongoDB connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
