var Sequelize= require('sequelize'); //libreria sequelize, usato per ORM (object oriented maping) con DB
var pg= require('pg');              //libreria pg, libreria per usato per connettere e interrogare DB 

//import insertData.js, questo moduli inserisce dato predefiniti nel DB
var insertData=require('./insertData.js'); 

//Stringa di connessione del DB e configurazione per sequelize
const connectionString = process.env.DATABASE_URL || 'postgres://dbSW:password@localhost:5432/swDBFinal';
var Conn = new Sequelize(connectionString);

/**
 * @brief dichiarazione tabella user con sequelize
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
 */
const giorno=Conn.define('giorni',{
        nome_giorno: Sequelize.STRING
    },{
        timestamps: false,
        freezeTableName: true
});

/**
 * @brief dichiarazione tabella pasto .
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
 */
const pasto_scelto=Conn.define('pasto_scelti',{},{
        timestamps:false,
        freezeTableName: true
});

// dichiarazione delle relazioni tra le tabelle (user, pasto, giorno) nel DB tramite Sequelize
pasto_scelto.belongsTo(user, {foreignKey: 'user_id', targetKey: 'id'});
pasto_scelto.belongsTo(pasto, {foreignKey: 'pasto_id', targetKey: 'id'});
pasto_scelto.belongsTo(giorno, {foreignKey: 'giorno_id', targetKey: 'id'});

/**
 * @brief dichiarazione tabella menu_giorno
 */
const menu_giorno=Conn.define('menu_giorni',{},{
        timestamps:false,
        freezeTableName: true
});   

// dichiarazione delle relazioni tra le tabelle (pasto, giorno) nel DB tramite Sequelize
menu_giorno.belongsTo(pasto, {foreignKey: 'pasto_id', targetKey: 'id'});
menu_giorno.belongsTo(giorno, {foreignKey: 'giorno_id', targetKey: 'id'});

/**
     * @brief Funzione che crea le tabelle con dati casuali.
     * @param [in] req--> richiesta http.
     * @param [in] res--> response http.
     * 
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
     * @param [in] res--> response http.
     * @param [in] id--> id di un user.
     * @param [in] callback --> un callBack che ritorna i risultati
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
 * @param [in] res--> response http.
 * @param [in] callback --> un callBack che ritorna i risultati
 */
function getMenu(res, callBack) {
    //query: cerca menu dei giorni e join con pasto
    menu_giorno.findAll({include:[{model: pasto, required: true}]}).then(function (result) {
       callBack (result); 
    }).catch(function (err) {
        //se c'e' errore durante query porta nel error page 500
        res.render('500');
    });
}

/**
 * @brief Funzioni che ritorna un utente.
 * @param [in] res--> response http.
 * @param [in] id--> id di un user.
 * @param [in] callback --> un callBack che ritorna i risultati
 */
function getUserById(res, id, callBack) {
    //query: tova un user con un specifico id
    user.findById(id).then(function (result) {
        callBack (result); 
    }).catch(function (err) {
        //se c'e' errore durante query porta nel error page 500
        res.render('500');
    });
}

/**
 * @brief Restituisce il menu per vedere sulla pagina.
 * @param [in] req--> richiesta http.
 * @param [in] res--> response http.
 * @return la pagina di benvenuto.
 */
function getMenuToShow(req, res) {
    var user_id= 1; //pre Imposto user id, vogliamo visualizzare il suo menu, visto che abbiamo solo un user abbiamo impostato a mano, se no sarebbe impostato nel http request
    //prendo dal db il menu preimpostato dall'azienda tramite result_menu_settimana
    getMenu(res, function (result_menu_settimana) {
        //creo oggetti giorni dove voglio salvare i dati ricevuti dal DB, imposto pasto scelto = falso
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
        //dal db prendo pasti gia' scelti dal utente tramite la funzione result_pasto_scelto, se ha scelto imposto var scelto = true
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
            //adesso metto menu preimpostato dall'azienda nei giorni in qui il chiente non ha ancora scelto il suo menu
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

            //prendo le informazioni del cliente e invio alla pagini tutte le info raccolte dal db alla pagina benvenuti
            getUserById(res, user_id, function (result_user) {
                res.statusCode = 200;
                res.render('benvenuto', {lun:lun, mar:mar, mer:mer, gio:gio, ven:ven, sab:sab, dom:dom, user: result_user});
            })
        })
    });
}
/**
 * @brief Imposto il menu all'utente. 
 * @param [in] req--> richiesta http.
 * @param [in] res--> response http.
 * @param [out] output--> 200 se andato a buon fine | 500 internal server db | 404 se non ha scelto tutti i pasti.
 * @return Description of returned value.
 */
function setUserMenu(req, res) {
    if(typeof req.body!= undefined && req.body){ //verifico se il body del post request e' definito o no
        var userid=req.body.userid;
        var giornoid=req.body.giornoid;
        var primo=req.body.primo;
        var secondo=req.body.secondo;
        var contorno=req.body.contorno;
        var dolce=req.body.dolce;
        if((primo != undefined || secondo != undefined || contorno != undefined || dolce != undefined) && (giornoid != undefined && userid != undefined)){ //se almeno utente ha scelto un pasto, allora salvo nel db
            //se il cliente almeno ha inserito un pasto e ci sono user id e del giorno id del pasto scelto
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
                //se tutto andato bene
                res.statusCode = 200;
                res.send('1'); //inserito pasti
            }).catch(function (err){ 
                //catch db errors
                res.statusCode = 500;
                res.send('-2'); //internel db error
            })
        }
        else{
            //errore mancano i parameters richiesti
            res.statusCode = 404;
            res.send('-1'); //no parameters
        }
    }
    else{
        //errore body del post e' vuoto
        res.statusCode = 404;
        res.send('-1'); //post body è vuoto
    }
}

//esporta le funzioni
exports.initTables = initTables;
exports.getMenuToShow = getMenuToShow;
exports.setUserMenu = setUserMenu;

