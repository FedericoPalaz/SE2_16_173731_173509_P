var Sequelize= require('sequelize'); //sequelize library
var pg= require('pg');              //pg library

//import insertData.js
var insertData=require('./insertData.js'); 

//Connessione al db
const connectionString = process.env.DATABASE_URL;
//const connectionString ='postgres://dbSW:password@localhost:5432/swDBFinal';
var Conn = new Sequelize(connectionString);

//dichiarazione tabella user
const user=Conn.define('users',{
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING
    },{
        timestamps: false,
        freezeTableName: true
});

//dichiarazione tabella giorno
const giorno=Conn.define('giorni',{
        nome_giorno: Sequelize.STRING
    },{
        timestamps: false,
        freezeTableName: true
});

//dichiarazione tabella pasto
const pasto=Conn.define('pasti',{
        nome_pasto: Sequelize.STRING,
        tipo: Sequelize.STRING,
        dettagli: Sequelize.TEXT
    },{
        timestamps:false,
        freezeTableName: true
});

//dichiarazione tabella pasto_scelto 
const pasto_scelto=Conn.define('pasto_scelti',{},{
        timestamps:false,
        freezeTableName: true
});

//dichiarazione foreignKey della tabella pasto_scelto
pasto_scelto.belongsTo(user, {foreignKey: 'user_id', targetKey: 'id'});
pasto_scelto.belongsTo(pasto, {foreignKey: 'pasto_id', targetKey: 'id'});
pasto_scelto.belongsTo(giorno, {foreignKey: 'giorno_id', targetKey: 'id'});

//dichiarazione tabella menu_giorno
const menu_giorno=Conn.define('menu_giorni',{},{
        timestamps:false,
        freezeTableName: true
});   

//dichiarazione foreignKey della tabella menu_giorno
menu_giorno.belongsTo(pasto, {foreignKey: 'pasto_id', targetKey: 'id'});
menu_giorno.belongsTo(giorno, {foreignKey: 'giorno_id', targetKey: 'id'});


//questa funzione crea le tabelle
function initTables() {
    Conn.sync({force:true}).then(function() {
        insertData.insertData(user,giorno,pasto,menu_giorno,pasto_scelto); //inserisci dati dentro le tabelle
    });
}

//Funzioni che ritorna la lista dei pasti scelti dal utente
function getPastiScelti(id, callBack) {
    pasto_scelto.findAll({where:{ user_id: id}, include: [{model: user, required: true},{model: pasto, required: true}]}).then(function (result) {
        callBack (result); 
    });
}

//Funzioni che ritorna la lista del menu
function getMenu(callBack) {
    menu_giorno.findAll({include:[{model: pasto, required: true}]}).then(function (result) {
       callBack (result); 
    });
}

//Funzioni che ritorna un user
function getUserById(id, callBack) {
    user.findById(id).then(function (result) {
        callBack (result); 
    })
}

function getMenuToShow(req, res) {
    var user_id= 1;
    getMenu(function (result_menu_settimana) {
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
        getPastiScelti(user_id, function (result_pasto_scelto) {
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

            //user
            getUserById(user_id, function (result_user) {
                res.render('benvenuto', {lun:lun, mar:mar, mer:mer, gio:gio, ven:ven, sab:sab, dom:dom, user: result_user});
            })
        })
    });
}

function setUserMenu(req, res) {
    pasto_scelto.create({
        user_id: req.body.userid,
        pasto_id: req.body.primo,
        giorno_id: req.body.giornoid
    }).then(function () {
        pasto_scelto.create({
            user_id: req.body.userid,
            pasto_id: req.body.secondo,
            giorno_id: req.body.giornoid
        });
    }).then(function () {
        pasto_scelto.create({
            user_id: req.body.userid,
            pasto_id: req.body.contorno,
            giorno_id: req.body.giornoid
        });
    }).then(function () {
        pasto_scelto.create({
            user_id: req.body.userid,
            pasto_id: req.body.dolce,
            giorno_id: req.body.giornoid
        });
    }).then(function () {
        res.redirect('/');
    });
    
}

exports.initTables = initTables;
exports.getMenuToShow = getMenuToShow;
exports.setUserMenu = setUserMenu;

