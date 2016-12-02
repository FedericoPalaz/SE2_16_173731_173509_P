var express = require('express');   //express library
var bodyParser = require('body-parser');   //body parser
var path =require('path');   //path

//init express
var app=express();

//parser for url and json
app.use(bodyParser.urlencoded({ extended: false }));    //parser for url
app.use(bodyParser.json()); //parser for json

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup port
app.set('port', (process.env.PORT || 5000));


app.get('/',function(req,res){
    res.render('prova',{title: 'Funziona'});
});

app.post('/ciao',function(req,res){
    res.send('Hello World!!');
});

//listening on port
app.listen(app.get('port'), function() {
  console.log('app is up on port', app.get('port'));
});