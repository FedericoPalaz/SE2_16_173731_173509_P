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

//Funzioni che ritorna la lista dei pasti scelti
function getPastiScelti(callBack) {
    pasto_scelto.findAll({ include: [{model: user, required: true},{model: pasto, required: true}]}).then(function (result) {
        callBack (result); 
    });
}

//Funzioni che ritorna la lista del menu
function getMenu(callBack) {
    menu_giorno.findAll({include:[{model: pasto, required: true}]}).then(function (result) {
       callBack (result); 
    });
}

exports.getPastiScelti=getPastiScelti;
exports.initTables=initTables;
exports.getMenu=getMenu;
