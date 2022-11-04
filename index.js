const express=require('express');
const app=express();
const path = require('path');
const colors=require('colors');
const sql=require('mysql');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use( express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
const bodyParser=require('body-parser');
const con = require('./config');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req, res)=>{
    res.render('HomePage');
})
app.get('/bookticket',(req, res)=>{
    res.render('mywebsite');
})
app.get('/already',(req, res)=>{
    res.render('already');
})
app.get('/booktiketnow',(req, res)=>{
    res.render('bookticketinterface');
})
app.get('/login',(req, res)=>{
    res.render('login');
})

app.get('/register',(req, res)=>{
    res.render('register');
});
app.get('/profile',(req, res)=>{ 
    res.render('profile');
})
app.get('/contact',(req, res)=>{
    res.render('ContactUs');
})
app.get('/invalidlogin',(req, res)=>{
    res.render('invalidlogin');
})

app.post('/login', (req, res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let userid=req.body.userid;
    let confirmpassword=req.body.confirmpassword;
    let sqlemail=`select email from register where email=?`;
    let sqluserid=`select userid from register where userid=?`;
    let sql=`insert into register (userid, email, password) values (?, ?, ?)`;
    con.query(sqlemail, [email], (error, results)=>{
        if(error) throw error
        if(results[0]==undefined){
            con.query(sqluserid, [userid], (err, result, field)=>{
                if(err) throw err;
                if(result[0]==undefined){
                    con.query(sql,[userid, email, password], (er, resul, fiel)=>{
                        if(er) throw er;
                        console.log("registered successfully ");
                        res.render('login');
                    })
                }
                else res.render('already');
            })
        }
        else{
            res.render('already');
        }
    })
});

var loggedin=false;

app.post('/profile', (req, res)=>{
    if(loggedin==false){
    let emailoruserid=req.body.emailoruserid;
    let password=req.body.password;
    let fetchemail=`select email, password from register where email=? and password=?`;
    let fetchuserid=`select userid, password from register where userid=? and password=?`;
    con.query(fetchemail,[emailoruserid, password] ,(err, result)=>{
        if(err) throw err;
       
        if(result[0]==undefined){
            con.query(fetchuserid, [emailoruserid, password],(er, resul)=>{
                if(er) throw er
                if(resul[0]==undefined){
                    res.render('invalidlogin');
                }
                else{
                    loggedin=true;
                    console.log("logged in successfully");
                    res.render('profile');
                }
            })
        }
        else{
            console.log("logged in successfully");
            loggedin=true;
            res.render('profile');
        }
    })}
    else res.render('profile');
})

module.exports=loggedin;
















app.listen(3000,(err)=>{
    if(err) throw err;
    console.log("server running at http://localhost:3000".green);
})
