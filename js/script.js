function avanti(s1,s2)
{
   document.getElementById(s1).style.display="none";
   document.getElementById(s2).style.display="block";
   document.getElementById("txt_"+s1).style.visibility="hidden";
   document.getElementById("txt_"+s2).style.visibility="visible";
}

function indietro(s1,s2)
{
   document.getElementById(s1).style.display="none";
   document.getElementById(s2).style.display="block";
   document.getElementById("txt_"+s1).style.visibility="hidden";
   document.getElementById("txt_"+s2).style.visibility="visible";
}