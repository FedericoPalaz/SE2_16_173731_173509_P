var Sequelize= require('sequelize'); //sequelize library
var pg= require('pg');              //pg library

//import insertData.js
var insertData=require('./insertData.js'); 

//Connessione al db
const connectionString = process.env.DATABASE_URL || 'postgres://dbSW:password@localhost:5432/swDBFinal';
var Conn = new Sequelize(connectionString);

/**
 * @brief dichiarazione tabella user .
 * @param [in|out] input--> nome tabella [string].
 * @param [in|out] input--> first name[string].
 * @param [in|out] input--> last name [string].
 * @return.
 */
const user=Conn.define('user',{
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING
    },{
        timestamps: false,
        freezeTableName: true
});

/**
 * @brief dichiarazione tabella giorno .
 * @param [in|out] input--> nome tabella [string].
 * @return.
 */
const giorno=Conn.define('giorni',{
        nome_giorno: Sequelize.STRING
    },{
        timestamps: false,
        freezeTableName: true
});

/**
 * @brief dichiarazione tabella pasto .
 * @param [in|out] input--> nome tabella [string].
 * @param [in|out] input--> nome pasto [string].
 * @param [in|out] input--> tipo pasto [string].
 * @param [in|out] input--> dettagli pasto [string].
 * @return.
 */
const pasto=Conn.define('pasti',{
        nome_pasto: Sequelize.STRING,
        tipo: Sequelize.STRING,
        dettagli: Sequelize.TEXT
    },{
        timestamps:false,
        freezeTableName: true
});

/**
 * @brief dichiarazione tabella pasto_scelto .
 * @param [in|out] input--> nome tabella.
 * @return.
 */
const pasto_scelto=Conn.define('pasto_scelti',{},{
        timestamps:false,
        freezeTableName: true
});

/**
 * @brief dichiarazione foreignKey della tabella pasto_scelto.
 * @param [in|out] input--> chiave esterna della prima tabella.
 * @param [in|out] input--> chiave esterna della seconda tabella.
 * @return .
 */
pasto_scelto.belongsTo(user, {foreignKey: 'user_id', targetKey: 'id'});
pasto_scelto.belongsTo(pasto, {foreignKey: 'pasto_id', targetKey: 'id'});
pasto_scelto.belongsTo(giorno, {foreignKey: 'giorno_id', targetKey: 'id'});

/**
 * @brief dichiarazione tabella menu_giorno .
 * @param [in|out] input--> nome tabella.
 * @return.
 */
const menu_giorno=Conn.define('menu_giorni',{},{
        timestamps:false,
        freezeTableName: true
});   

/**
 * @brief dichiarazione foreignKey della tabella menu_giorno.
 * @param [in|out] input--> chiave esterna della prima tabella.
 * @param [in|out] input--> chiave esterna della seconda tabella.
 * @return Description of returned value.
 */
menu_giorno.belongsTo(pasto, {foreignKey: 'pasto_id', targetKey: 'id'});
menu_giorno.belongsTo(giorno, {foreignKey: 'giorno_id', targetKey: 'id'});

/**
     * @brief Funzione che crea le tabelle con dati casuali.
     * @return .
     */
function initTables(req, res) {
    Conn.sync({force:true}).then(function() {
        insertData.insertData(user,giorno,pasto,menu_giorno,pasto_scelto); //inserisci dati dentro le tabelle
    }).then(function () {
            res.redirect('/');
    }).catch(function (err) {
        res.render('500');
    });
}

/**
 * @brief Funzioni che ritorna la lista dei pasti scelti dal utente.
 * @param [in|out] input--> richiesta.
 * @param [in|out] input--> id dell'utente.
 * @param [in|out] input--> callback restituisce i risultati.
 * @return .
 */
function getPastiScelti(res, id, callBack) {
    pasto_scelto.findAll({where:{ user_id: id}, include: [{model: user, required: true},{model: pasto, required: true}]}).then(function (result) {
        callBack (result); 
    }).catch(function (err) {
        res.render('500');
    });
}

/**
 * @brief Funzioni che ritorna la lista del menu.
 * @param [in|out] input--> la richiesta.
 * @param [in|out] input--> callback restituisce i risultati.
 * @return .
 */
function getMenu(res, callBack) {
    menu_giorno.findAll({include:[{model: pasto, required: true}]}).then(function (result) {
       callBack (result); 
    }).catch(function (err) {
        res.render('500');
    });
}

/**
 * @brief Funzioni che ritorna un utente.
 * @param [in|out] input--> la richiesta.
 * @param [in|out] input--> id dell'utente.
 * @param [in|out] input--> callback restituisce i risultati.
 * @return .
 */
function getUserById(res, id, callBack) {
    user.findById(id).then(function (result) {
        callBack (result); 
    }).catch(function (err) {
        res.render('500');
    });
}

/**
 * @brief Restituisce il menu per vedere sulla pagina.
 * @param [in|out] input--> la richiesta.
 * @param [in|out] input--> la risposta.
 * @return la pagina di benvenuto.
 */
function getMenuToShow(req, res) {
    var user_id= 1;
    getMenu(res, function (result_menu_settimana) {
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
        getPastiScelti(res, user_id, function (result_pasto_scelto) {
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
            getUserById(res, user_id, function (result_user) {
                res.statusCode = 200;
                res.render('benvenuto', {lun:lun, mar:mar, mer:mer, gio:gio, ven:ven, sab:sab, dom:dom, user: result_user});
            });
        });
    });
}
/**
 * @brief Imposto il menu all'utente. 
 * @param [in|out] input--> la richiesta.
 * @param [in|out] input--> la risposta.
 * @param [in|out] output--> 200 se andato a buon fine | 500 internal server db | 404 se non ha scelto tutti i pasti.
 * @return .
 */
function setUserMenu(req, res) {
    if(typeof req.body!= undefined && req.body){ //verifico se body di post e' definito o no
        var userid=req.body.userid;
        var giornoid=req.body.giornoid;
        var primo=req.body.primo;
        var secondo=req.body.secondo;
        var contorno=req.body.contorno;
        var dolce=req.body.dolce;

        if((primo != undefined || secondo != undefined || contorno != undefined || dolce != undefined) && (giornoid != undefined && userid != undefined)){ //se almeno utente ha scelto un pasto, allora salvo nel db
            pasto_scelto.create({
                user_id: userid,
                pasto_id: primo,
                giorno_id: giornoid
            }).then(function () {
                pasto_scelto.create({
                    user_id: userid,
                    pasto_id: secondo,
                    giorno_id: giornoid
                });
            }).then(function () {
                pasto_scelto.create({
                    user_id: userid,
                    pasto_id: contorno,
                    giorno_id: giornoid
                });
            }).then(function () {
                pasto_scelto.create({
                    user_id: userid,
                    pasto_id: dolce,
                    giorno_id: giornoid
                });
            }).then(function () {
                res.statusCode = 200;
                res.send('1'); //inserito pasti
            }).catch(function (err){ //catch db errors
                res.statusCode = 500;
                res.send('-2'); //internel db error
            })
        }
        else{
            res.statusCode = 404;
            res.send('-1'); //no parameters
        }
    }
    else{
        res.statusCode = 404;
        res.send('-1'); //post body è vuoto
    }
}

//esporta le funzioni
exports.initTables = initTables;
exports.getMenuToShow = getMenuToShow;
exports.setUserMenu = setUserMenu;

