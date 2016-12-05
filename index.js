
var express = require('express');   //express library
var bodyParser = require('body-parser');   //body parser
var path =require('path');   //path

//init express
var app=express();

//import db
var db= require('./db.js');

/*
//pg
const pg = require('pg');
//const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
*/

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


app.use('/db/init',function(req,res){
    db.initTables();
    res.send('Fatto, Controlla nel db se ho creato tabella user e inserito Jhon ');

});

app.use('/pastoScelto',db.getPastiScelti);

app.use('/stampa',function (req,res) {
    db.getPastiScelti(function (result_pasto_scelto) {
        console.log(result_pasto_scelto);
    });
});

app.get('/',function (req, res){
    db.getMenu(function (result_menu_settimana) {
        var lun={
          scelto: false,
          pasti: []
        },
        mar={
          scelto: false,
          pasti: []
        },
        mer={
          scelto: false,
          pasti: []
        },
        gio={
          scelto: false,
          pasti: []
        },
        ven={
          scelto: false,
          pasti: []
        },
        sab={
          scelto: false,
          pasti: []
        },
        dom={
          scelto: false,
          pasti: []
        };
        db.getPastiScelti(function (result_pasto_scelto) {
            for(var i = 0; i< result_pasto_scelto.length; i++){
                if(parseInt(result_pasto_scelto[i].giorno_id)==1){
                  lun.scelto=true;
                  lun.pasti.push(result_pasto_scelto[i].pasti);
                }
                if(parseInt(result_pasto_scelto[i].giorno_id)==2){
                  mar.scelto=true;
                  mar.pasti.push(result_pasto_scelto[i].pasti);
                }
                if(parseInt(result_pasto_scelto[i].giorno_id)==3){
                  mer.scelto=true;
                  mer.pasti.push(result_pasto_scelto[i].pasti);
                }
                if(parseInt(result_pasto_scelto[i].giorno_id)==4){
                  gio.scelto=true;
                  gio.pasti.push(result_pasto_scelto[i].pasti);
                }
                if(parseInt(result_pasto_scelto[i].giorno_id)==5){
                  ven.scelto=true;
                  ven.pasti.push(result_pasto_scelto[i].pasti);
                }
                if(parseInt(result_pasto_scelto[i].giorno_id)==6){
                  sab.scelto=true;
                  sab.pasti.push(result_pasto_scelto[i].pasti);
                }
                if(parseInt(result_pasto_scelto[i].giorno_id)==7){
                  dom.scelto=true;
                  dom.pasti.push(result_pasto_scelto[i].pasti);
                }
            }
            for(var i = 0; i< result_menu_settimana.length; i++){
                  if(parseInt(result_menu_settimana[i].giorno_id)==1){
                    if(lun.scelto==false)
                      lun.pasti.push(result_menu_settimana[i].pasti);
                  }
                  if(parseInt(result_menu_settimana[i].giorno_id)==2){
                    if(mar.scelto==false)
                      mar.pasti.push(result_menu_settimana[i].pasti);
                  }
                  if(parseInt(result_menu_settimana[i].giorno_id)==3){
                    if(mer.scelto==false)
                      mer.pasti.push(result_menu_settimana[i].pasti);
                  }
                  if(parseInt(result_menu_settimana[i].giorno_id)==4){
                    if(gio.scelto==false)
                      gio.pasti.push(result_menu_settimana[i].pasti);
                  }
                  if(parseInt(result_menu_settimana[i].giorno_id)==5){
                    if(ven.scelto==false)
                      ven.pasti.push(result_menu_settimana[i].pasti);
                  }
                  if(parseInt(result_menu_settimana[i].giorno_id)==6){
                    if(sab.scelto==false)
                      sab.pasti.push(result_menu_settimana[i].pasti);
                  }
                  if(parseInt(result_menu_settimana[i].giorno_id)==7){
                    if(dom.scelto==false)
                      dom.pasti.push(result_menu_settimana[i].pasti);
                  }
            }
            console.log(JSON.stringify(lun, null, '\t'));
            res.render('benvenuto',{lun:lun, mar:mar, mer:mer, gio:gio, ven:ven, sab:sab, dom:dom});
        })
    });
})

//ritorna menu della settimana
app.get('/menu', function (req,res) {
    db.getMenu(function (result) {
        res.send(result);
    });
});

//listening on port
app.listen(app.get('port'), function() {
  console.log('app is up on port', app.get('port'));
});


