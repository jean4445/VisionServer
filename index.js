var express = require('express');
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var app = express();
var md5 = require('md5');
var assert = require('assert');
var http = require('http');
var mongodbURL = 'mongodb://jean4445jean4445:j_60924@ds127436.mlab.com:27436/vision';
var myDB;

//新增資料
app.get('/api/Image/Create',function(request,response){
	var item={
		name:request.query.name,
		imagelink:request.query.imagelink,
		description:request.query.description,
		picture:request.query.picture
	}
	var collection=myDB.collection('my_data');
	collection.insert(item,function(err,result){
		if(err){
			response.status(406).send(err).end();
		}else{
			response.type('application/json');
			response.status(200).send(result).end();
		}
	});
});

//搜尋資料
app.get('/api/Image/Search', function(request, response) {
	var item={
		name:request.query.name,
		description:request.query.description
	}
      var collection = myDB.collection('my_data');
      collection.find({name:request.query.name,description:request.query.description},{imagelink:1}).toArray(function(err, docs) {
      if (err) {
          response.status(406).end();
       } else {
         response.type('application/json');
         response.status(200).send(docs).end();
       }
   });
});

app.get('/', function(request, response) {
response.status(200).send('<html><body><H1>Hello World</H1></body></html>');
response.end();
});
app.get('/api/test', function(request, response) {
var ret = {
msg : 'Hello World',
status : 0
}
response.status(200).send(JSON.stringify(ret));
response.end();
});
app.listen(5000);
