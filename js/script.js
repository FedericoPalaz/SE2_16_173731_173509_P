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

$(document).ready(function(){
    $(.btn).click(function(){
        var id=$(.btn).parent().parent().parent().attr('id');
        window.alert(id);
        var form=document.getElementById(id);
        window.alert(form);
        var primo = document.form.primo.value;
        window.alert(primo);
        var secondo = document.form.secondo.value;
        var contorno = form.contorno.value;
        var dolce = form.dolce.value;
        
        if ((primo == "") || (primo == "undefined")) {
            alert("Non hai scelto nessun primo. E' obligatorio!");
            document.form.primo.focus();
            return false;
        }
    });
});
