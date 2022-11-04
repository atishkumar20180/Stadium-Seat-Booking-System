var useroremail;
var password;
var userid="atish";
var email="atish@test.com";
var pass="atish@123";
var valid=true;
function inputuseridemail(){
    useroremail=document.getElementById('emailoruserid').value;
    if(useroremail!=userid && useroremail!=email){valid=false;}
}
function inputpassword(){
    password=document.getElementById('password').value;
    if(password!=pass){valid=false;}
}
function login(){
    if(valid){
        location.href="profile.html";
    }
    else{
        document.getElementById('error').style.display="block";
    }
}