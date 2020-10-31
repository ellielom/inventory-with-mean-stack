const express = require('express')
const app = express()
const port = 8887
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    next();
})

var database = "t"
var collection = "tt"

app.listen(port, () => console.log(`Server running at localhost:${port}!`))

app.post('/createSampleCollection', (req, res) => {

    input = req.body.params.input
    database = req.body.params.database
    collection = req.body.params.collection

    var convertedProducts = []

    for (var i = 0 ; i < input.length; i++) {
        product = { 
            id: input[i].id,
            description: input[i].description,
            quantity: input[i].quantity,
            price: input[i].price,
            reorder: input[i].reorder
        }
        convertedProducts.push(product)
    }


    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.insertMany(convertedProducts, (err, result) => {
                if (err) { data.close(); return; }
                res.send({ "message": 'Records added' })
            }) // end insert one
        } // end else
        data.close()
    }) // end MongoDB
})


app.post('/createEmptyCollection', (req, res) => {
    database = req.body.params.database
    collection = req.body.params.collection

    console.log('Database: ' + database + '; collection: ' + collection)
    res.send({ "message": 'Database and collection created' })
})


app.post('/insert', (req, res) => {
    input = req.body.params

    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.insertOne(input, (err, result) => {
                if (err) { data.close(); return; }
                res.send({ "message": 'Record added', "id": result.insertedId })
            }) // end insert one
        } // end else
        data.close()
    }) // end MongoDB
})

app.post('/insertMany', (req, res) => {
    input = req.body.params

    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.insertMany(input, (err, result) => {
                if (err) { data.close(); return; }
                res.send({ "message": 'Record added', "id": result.insertedId })
            }) // end insert one
            console.log(res.insertedIds);
        } // end else
        data.close()
    }) // end MongoDB
})

app.get('/retrieve', (req, res) => {
    input = req.query

    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.find(input).toArray((err, records) => {
                if (err) { data.close(); return; }
                i = records.length;  // but why?
                res.send(records);
            }) // end find
        } // end else
        data.close()
    }) // end MongoDB
})

app.get('/retrieveBaseProducts', (req, res) => {


    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.find({}).toArray((err, records) => {
                if (err) { data.close(); return; }
                i = records.length;  // but why?
                res.send(records);
            }) // end find
        } // end else
        data.close()
    }) // end MongoDB
})


app.put('/edit', (req, res) => {
    search = req.body.params.search
    change = req.body.params.change

    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.updateOne({ id: search }, {
                $set:
                {
                    id: change.id,
                    description: change.description,
                    quantity: change.quantity,
                    price: change.price,
                    reorder: change.reorder
                }
            },
                (err, result) => {
                    if (err) { data.close(); return; }
                    res.send({ "message": 'Record updated', "id": result.insertedId })
                }) // end update one
        } // end else
        data.close()
    }) // end MongoDB
})

app.delete('/deleteOne', (req, res) => {
    input = req.query

    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.deleteOne({ id: input.id }, (err, records) => {
                console.log(input)
                if (err) { data.close(); return; }
                console.log('Deleted count: ' + records.deletedCount)
                console.log('Result: ' + records.result)
                res.send({ "message": input.id + " deleted"})
            }) // end delete
        } // end else
        data.close()
    }) // end MongoDB
})

app.delete('/deleteAll', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, data) => {
        if (err) {
            console.log('Unable to connect to the MongoDB: ', err)
            return console.log('Unable to connect to the MongoDB: ', err)
        }
        else { //db server connected!
            db = data.db(database)
            var collection = db.collection(database);
            collection.deleteMany({}, (err, records) => {
                if (err) { data.close(); return; }
                console.log('Deleted count: ' + records.deletedCount)
                console.log('Result: ' + records.result)
                res.send({ "message": records.deletedCount + " products deleted"})

            }) // end delete
        } // end else
        data.close()
    }) // end MongoDB
})