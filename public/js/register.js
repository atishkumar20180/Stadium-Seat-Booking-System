// if(str!="ok"){
//      document.getElementById('success').innerHTML="";
//      document.getElementById('error').innerHTML=str;
// }
// console.log(vali);
function check(){
     if(document.getElementById('password').value==document.getElementById('confirmpassword').value)
     {
          if(document.getElementById('password').value!="")
         { document.getElementById('success').innerHTML="Password Matched";
     document.getElementById('error').innerHTML="";
          document.getElementById('registerbutton').disabled=false;
}
     else{
          document.getElementById('error').innerHTML="";
          document.getElementById('success').innerHTML="";
          document.getElementById('registerbutton').disabled=true;
     }
     }
     else{document.getElementById('error').innerHTML="Password Not Matched";
     document.getElementById('success').innerHTML="";
     document.getElementById('registerbutton').disabled=true;
     }
}

