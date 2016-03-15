var express = require('express');
var router = express.Router();
//add database connection
var MongoClient= require('mongodb').MongoClient;
var assert= require('assert');
ObjectId= require('mongodb').ObjectId;
var url= 'mongodb://localhost:27017/test';


//database insert script
var insertDocument= function(db, callback){
  db.collection('restraunts').insertOne({
    "address" : {
         "street" : "2 Avenue",
         "building" : "1480"
      },
      "name" : "Manhattan"
    }
  ,function(err, result){
    assert.equal(err, null);
    console.log("inserted document to the restraunts collection");
    callback();
  });
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function(res,req,next){
	//insert into document
	MongoClient.connect(url, function(err, db){
	 	assert.equal(null, err);
	  	insertDocument(db, function(){
			db.close();
	  	});
	});
})

module.exports = router;
