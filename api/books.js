module.exports = function (app, database) {
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb://localhost:27017";
  const dbName = "test";
  const collectionName = "books";

  //localhost:3000/books
  app.get("/books", (req, res) => {
    MongoClient.connect(
      url,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        db.collection(collectionName)
          .find()
          .toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            client.close();
          });
      }
    );
  });

  //localhost:3000/books
  app.post("/books", (req, res) => {
    const book = {
      author: req.query.author,
      title: req.query.title,
      text: req.query.text,
    };
    MongoClient.connect(
      url,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        db.collection(collectionName).insertOne(book, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result.ops[0]);
          }
        });
      }
    );
  });

  //localhost:3000/books/6010865a1acdcc599036368c
  app.get("/books/:id", (req, res) => {
    const ObjectID = require("mongodb").ObjectID;
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    MongoClient.connect(
      url,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        db.collection(collectionName).findOne(query, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      }
    );
  });

  //localhost:3000/books/6010865a1acdcc599036368c
  app.put("/books/:id", (req, res) => {
    const ObjectID = require("mongodb").ObjectID;
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    const body = {
      author: req.body.author,
      title: req.body.title,
      text: req.body.text,
    };
    console.log("body", body);
    MongoClient.connect(
      url,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        db.collection(collectionName).update(query, body, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      }
    );
  });

  //localhost:3000/books/6010865a1acdcc599036368c
  app.delete("/books/:id", (req, res) => {
    const ObjectID = require("mongodb").ObjectID;
    const id = req.params.id;
    const query = { _id: new ObjectID(id) };
    MongoClient.connect(
      url,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) throw err;
        let db = client.db(dbName);
        db.collection(collectionName).deleteOne(query, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      }
    );
  });
};
