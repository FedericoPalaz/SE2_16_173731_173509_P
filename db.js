var Sequelize= require('sequelize');
var pg= require('pg');
var random=require('./random.js');

//const connectionString = process.env.DATABASE_URL;
const connectionString ='postgres://dbSW:password@localhost:5432/swDBFinal';
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
function createTable() {
    Conn.sync({force:true}).then(function() {
        insert_rows();
    });
}

function insert_rows() {
    //crea un user
    user.create({
            first_name: 'Rossi',
            last_name: 'Mario'
    });
    //crea giorni
    giorno.create({
            nome_giorno: 'lun'
    });
    giorno.create({
            nome_giorno: 'mar'
    });
    giorno.create({
            nome_giorno: 'mer'
    });
    giorno.create({
            nome_giorno: 'gio'
    });
    giorno.create({
            nome_giorno: 'ven'
    });
    giorno.create({
            nome_giorno: 'sab'
    });
    giorno.create({
            nome_giorno: 'dom'
    });

    //crea pasti
    //crea parimi
    pasto.create({
            nome_pasto: 'Pasta al pomodoro',
            tipo: 'primo'
    });
    pasto.create({
            nome_pasto: 'Pasta bianca',
            tipo: 'primo'
    });
    pasto.create({
            nome_pasto: 'Minestrone',
            tipo: 'primo'
    });
    pasto.create({
            nome_pasto: 'Risotto',
            tipo: 'primo'
    });
    pasto.create({
            nome_pasto: 'Lasagna',
            tipo: 'primo'
    });
    //create secondo
    pasto.create({
            nome_pasto: 'Bistecca di Manzo',
            tipo: 'secondo'
    });
    pasto.create({
            nome_pasto: 'Salmone in crosta',
            tipo: 'secondo'
    });
    pasto.create({
            nome_pasto: 'Pollo al forno',
            tipo: 'secondo'
    });
    pasto.create({
            nome_pasto: 'Arrosto di lonza',
            tipo: 'secondo'
    });
    //create contorno
    pasto.create({
            nome_pasto: 'Patatine fritte',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Patate al forno',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Carote',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Funghi',
            tipo: 'contorno'
    });
    pasto.create({
            nome_pasto: 'Insalata',
            tipo: 'contorno'
    });

    //create dolce
    pasto.create({
            nome_pasto: 'Budino',
            tipo: 'dolce'
    });
    pasto.create({
            nome_pasto: 'Yogurt',
            tipo: 'dolce'
    });
    pasto.create({
            nome_pasto: 'Frutta',
            tipo: 'dolce'
    });
    pasto.create({
            nome_pasto: 'Crostata',
            tipo: 'dolce'
    });

    //inserire menu_giorno
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 1
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 2
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 3
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 4
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 5
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 6
            });
        }
    }
    random.init(0,18);
    for(var i=0;i<10;i++){
        var num=random.getNum();
        if(num>0){
            menu_giorno.create({
                pasto_id: num,
                giorno_id: 7
            });
        }
    }

    //create Menu scelto dal user num 1
    pasto_scelto.create({
        user_id: 1,
        pasto_id: 2,
        giorno_id:1
    });
    pasto_scelto.create({
        user_id: 1,
        pasto_id: 11,
        giorno_id:1
    });
    pasto_scelto.create({
        user_id: 1,
        pasto_id: 17,
        giorno_id:1
    });
    
}

function initDb() {
    // force: true will drop the table if it already exists
    user.sync({force: true}).then(function () {
        // Table created
        return user.create({
            first_name: 'John',
            last_name: 'Hancock'
        });
    }).then(function() {
        user.findOne().then(function (user_res) {
            console.log(user_res.dataValues);
        });
    });

    //query
    /*
    user.findAll({
        where:{
            id:1
        }
    }
    ).then(function (user_res) {
        return user_res.first_name;
    });*/
}

exports.initDb=initDb;
exports.createTable=createTable;