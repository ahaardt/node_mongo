const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = "confusion";

MongoClient.connect(url,(err,client) => {
    //assert, whether there is connection
    assert.equal(err,null);

    console.log('Connected correctly to server');

    //Connect to the interface
    const db = client.db(dbname);
    //connect to a collection
    const collection = db.collection("dishes");

    //Insert record into DB
    collection.insertOne({"name": "Uthappizza", "description": "test"},
    (err, result) => {
        //Assert there is no ererpr
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        //Find all dishes
        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs);

            //drop the specific collection from DB
            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                client.close();
            });
        });
    });

});