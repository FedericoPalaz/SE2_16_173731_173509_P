var Sequelize= require('sequelize');
var pg= require('pg');
var insertData=require('./insertData.js');

const connectionString = process.env.DATABASE_URL;
//const connectionString ='postgres://dbSW:password@localhost:5432/swDBFinal';
var Conn = new Sequelize(connectionString);

const user=Conn.define('users',{
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING
    },{
        timestamps: false,
        freezeTableName: true
});

const giorno=Conn.define('giorni',{
        nome_giorno: Sequelize.STRING
    },{
        timestamps: false,
        freezeTableName: true
});

const pasto=Conn.define('pasti',{
        nome_pasto: Sequelize.STRING,
        tipo: Sequelize.STRING
    },{
        timestamps:false,
        freezeTableName: true
});

const pasto_scelto=Conn.define('pasto_scelti',{},{
        timestamps:false,
        freezeTableName: true
});

//dichiarazione foreignKey della tabella pasto_scelto
pasto_scelto.belongsTo(user, {foreignKey: 'user_id', targetKey: 'id'});
pasto_scelto.belongsTo(pasto, {foreignKey: 'pasto_id', targetKey: 'id'});
pasto_scelto.belongsTo(giorno, {foreignKey: 'giorno_id', targetKey: 'id'});

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
        insertData.insertData(user,giorno,pasto,menu_giorno,pasto_scelto); //inserisci dati in queste tabelle
    });
}

function getPastiScelti(req,res) {
    pasto_scelto.findAll({ include: [{model: user, required: true},{model: pasto, required: true}]}).then(function (result) {
        console.log(JSON.stringify(result, null, '\t'));
        res.send(JSON.stringify(result, null, '\t'));
    });
}

exports.getPastiScelti=getPastiScelti;
exports.initTables=initTables;
