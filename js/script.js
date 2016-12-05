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
    $(".btn-floating").click(function(){
        window.alert($(this).parent().parent().parent().attr('id'));
    });
});
