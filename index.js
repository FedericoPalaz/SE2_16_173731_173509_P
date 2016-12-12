
var express = require('express');   //express library
var path =require('path');   //path
var bodyParser = require('body-parser');   //body parser
var http = require('http'), url  = require('url'); //for read request url
var request = require('request'); //for do request from node js

//init express
var app=express();

//parser for url and json
app.use(bodyParser.urlencoded({ extended: false }));    //parser for url
app.use(bodyParser.json()); //parser for json

//import db
var db= require('./dataManager/db.js');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mount middlewear (allow to show static files)
app.use('/css',express.static(__dirname+'/css'));
app.use('/fonts',express.static(__dirname+'/fonts'));
app.use('/js',express.static(__dirname+'/js'));

//setup port
app.set('port', (process.env.PORT || 5000));

/**
 * @brief Intercetto tutte le richiets ROOT/db/init.
 * @param [in|out] input--> richiama la funzione db.initTables.
 * @return Description of returned value.
 */
app.use('/db/init', db.initTables);

/**
 * @brief Intercetto tutte le richiets ROOT/.
 * @param [in|out] input--> richiama la funzione db.getMenuToShow.
 * @return nella pagina benvenuto.ejs.
 */
app.get('/', db.getMenuToShow);

/**
 * @brief Intercetto tutte le richiets ROOT/setDayMenu.
 * @param [in|out] input--> richiama la funzione db.setUserMenu.
 * @return Description of returned value.
 */
app.post('/setDayMenu', db.setUserMenu);

app.use('*', function (req, res) {
  res.statusCode = 404;
  res.render('404');
})

//listening on port
app.listen(app.get('port'), function() {
  console.log('app is up on port', app.get('port'));
});


