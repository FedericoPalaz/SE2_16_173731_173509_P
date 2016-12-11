/**
 * @brief Apri e chiude i menu a tendina
 * @param [in|out] input -> id del menu che si deve aprire o chiudere in base al suo stato iniziale.
 * @return .
 */
function apri(s)
{
   var x=document.getElementById(s);
    if(x.style.display=="none")
        {
            document.getElementById("lunedi").style.display="none" ;
            document.getElementById("martedi").style.display="none" ;
            document.getElementById("mercoledi").style.display="none" ;
            document.getElementById("giovedi").style.display="none" ;
            document.getElementById("venerdi").style.display="none" ;
            document.getElementById("sabato").style.display="none" ;
            document.getElementById("domenica").style.display="none" ;
            x.style.display="block";
        }
    else
        {
            document.getElementById("lunedi").style.display="none" ;
            document.getElementById("martedi").style.display="none" ;
            document.getElementById("mercoledi").style.display="none" ;
            document.getElementById("giovedi").style.display="none" ;
            document.getElementById("venerdi").style.display="none" ;
            document.getElementById("sabato").style.display="none" ;
            document.getElementById("domenica").style.display="none" ;
        }
}


/**
 * @brief Invia la richiesta al server per dalvare i dati.
 * @param [in|out] input-> id della form.
 * @return un popup in caso di errore.
 */
function salvaPasti(form_id) {
    if(verficaForm(form_id)){ //se l'utente ha inserito almeno un un pasto allora invia la richiesta di salvare al server api
        var form_id_S='#'+form_id;
        $.post( "/setDayMenu", $( form_id_S ).serialize(), function (data, status) {
            
            if(data=='1'){
                Materialize.toast('Successo: Salvato i tuoi pasti', 5000, 'green accent-3');
                window.setTimeout(function () {
                    location.href = "/";
                }, 5000);
            }
            if(data=='-1')
                Materialize.toast('Errore!!: Post Body Vuoto', 5000, 'red darken-1');
            if(data=='-2')
                Materialize.toast('Internel Errore!! Riprova dopo', 5000, 'red darken-1');
        });
    }
    else
        Materialize.toast('Alert!!: Devi inserire almeno un pasto !!!', 5000, 'amber darken-3');
}

/**
 * @brief verifica se un utente ha inserito almeno un pasto.
 * @param [in|out] input--> id della form.
 * @param [in|out] output--> boolean 
 * @return true se ne trova alemno uno altrimenti rimane false.
 */
function verficaForm(form_id) {
    var checkedOne=false;
    var query='form#'+form_id+' input[type=radio]';
    $(query).each(function(){
        var input = $(this); // This is the jquery object of the input, do what you will
        if (input.prop("checked")){
            checkedOne=true;
        }
    });
    return checkedOne;
}

