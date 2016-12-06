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
    $(".btn").click(function(){
        var name=$(this).parent().parent().parent().attr('name');
        var primo = document.name.primo.value;
        window.alert(primo);
        var secondo = document.name.secondo.value;
        var contorno = document.name.contorno.value;
        var dolce = document.name.dolce.value;
        
        if ((primo == "") || (primo == "undefined")) {
            alert("Non hai scelto nessun primo. E' obligatorio!");
            document.form.primo.focus();
            return false;
        }
        return false;
    });
});
