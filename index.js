/*
var express = require('express');   //express library
var bodyParser = require('body-parser');   //body parser
var path =require('path');   //path

//init express
var app=express();

//pg
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);


//parser for url and json
app.use(bodyParser.urlencoded({ extended: false }));    //parser for url
app.use(bodyParser.json()); //parser for json

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mount middlewear (allow to show static files)
app.use('/css',express.static(__dirname+'/css'));
app.use('/fonts',express.static(__dirname+'/fonts'));
app.use('/js',express.static(__dirname+'/js'));

//setup port
app.set('port', (process.env.PORT || 5000));


app.get('/',function(req,res){
    client.connect();
    var query = client.query('SELECT * FROM prova');
    query.on('row', function(row) {
      res.render('prova',{title: row.cognome});
    });
});

app.use('/ciao',function(req,res){
    res.send('Hello World!!');
});

//listening on port
app.listen(app.get('port'), function() {
  console.log('app is up on port', app.get('port'));
});
*/

var Sequelize= require('sequelize');
var pg= require('pg');

const connectionString = process.env.DATABASE_URL;
//const connectionString ='postgres://dbSW:password@localhost:5432/dbSW';
var Conn = new Sequelize(connectionString);

Conn
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
});