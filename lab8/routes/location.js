
var express = require('express');
var router = express.Router();


var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost.27017/locations', function (err, db) {
    if (err) {
        throw err;
    }
    var eriLocation = { "name": "Eritrea", "category": ["Hospital", "Restaurant", "Park"], "coord":{ latitude: -73.856077} };
    db.collection('location').insert(eriLocation, function (err, locationPointsInserted) {
        if (err) {
            throw err;
        }
        console.dir('Success: ${JSON.stringify(locationPointsInserted)}');
        return db.close();

    });
    var query = {};
    var operator = {};
    var options = { 'upsert': true };
    db.collection('location').update(query, operator, options, function (err, nUpserted) {
        if (err) {
            throw err;
        }
        console.dir("Successfully upserted" + nUpserted);
        return db.close();

    });

    db.collection('location').find(query).toArray(function (err, docsArr) {
        if (err) {
            throw err;
        }
        var query = {};
        console.dir(docsArr);
        return db.close();


    });
    db.collection('location').remove(query).toArray(function (err, removed) {
        if (err) {
            throw err;
        }
        var query = {};
        console.dir(removed + "removed successfully");
        return db.close();
    });
});
module.exports = router;