// const express=require('express');
// const app=express();
// const path = require('path');
// const colors=require('colors');
// const sql=require('mysql');
// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.use( express.static('public'));
// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/js', express.static(__dirname + 'public/js'));
// app.use('/img', express.static(__dirname + 'public/img'));
// const bodyParser=require('body-parser');
// const con = require('./config');
// app.use(bodyParser.urlencoded({extended:true}));

// app.get('/',(req, res)=>{
//     res.render('HomePage');
// })
// app.get('/bookticket',(req, res)=>{
//     res.render('mywebsite');
// })
// app.get('/already',(req, res)=>{
//     res.render('already');
// })
// app.get('/booktiketnow',(req, res)=>{
//     res.render('bookticketinterface');
// })
// app.get('/login',(req, res)=>{
//     res.render('login');
// })

// app.get('/register',(req, res)=>{
//     res.render('register');
// });
// app.get('/profile',(req, res)=>{ 
//     res.render('profile');
// })
// app.get('/contact',(req, res)=>{
//     res.render('ContactUs');
// })
// app.get('/invalidlogin',(req, res)=>{
//     res.render('invalidlogin');
// })

// app.post('/login', (req, res)=>{
//     let email=req.body.email;
//     let password=req.body.password;
//     let userid=req.body.userid;
//     let confirmpassword=req.body.confirmpassword;
//     let sqlemail=`select email from register where email=?`;
//     let sqluserid=`select userid from register where userid=?`;
//     let sql=`insert into register (userid, email, password) values (?, ?, ?)`;
//     con.query(sqlemail, [email], (error, results)=>{
//         if(error) throw error
//         if(results[0]==undefined){
//             con.query(sqluserid, [userid], (err, result, field)=>{
//                 if(err) throw err;
//                 if(result[0]==undefined){
//                     con.query(sql,[userid, email, password], (er, resul, fiel)=>{
//                         if(er) throw er;
//                         console.log("registered successfully ");
//                         res.render('login');
//                     })
//                 }
//                 else res.render('already');
//             })
//         }
//         else{
//             res.render('already');
//         }
//     })
// });

// var loggedin=false;

// app.post('/profile', (req, res)=>{
//     if(loggedin==false){
//     let emailoruserid=req.body.emailoruserid;
//     let password=req.body.password;
//     let fetchemail=`select email, password from register where email=? and password=?`;
//     let fetchuserid=`select userid, password from register where userid=? and password=?`;
//     con.query(fetchemail,[emailoruserid, password] ,(err, result)=>{
//         if(err) throw err;
       
//         if(result[0]==undefined){
//             con.query(fetchuserid, [emailoruserid, password],(er, resul)=>{
//                 if(er) throw er
//                 if(resul[0]==undefined){
//                     res.render('invalidlogin');
//                 }
//                 else{
//                     loggedin=true;
//                     console.log("logged in successfully");
//                     res.render('profile');
//                 }
//             })
//         }
//         else{
//             console.log("logged in successfully");
//             loggedin=true;
//             res.render('profile');
//         }
//     })}
//     else res.render('profile');
// })
// module.exports=loggedin;
// app.listen(3000,(err)=>{
//     if(err) throw err;
//     console.log("server running at http://localhost:3000".green);
// })


/*****************my fresh code  ********************* */


const express=require('express');
const app=express();
const path=require('path');
const colors=require('colors');
const con=require('./config');
const moment=require('moment');
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var loggedin=false;
var user="abcd";
const beforelogin={firstdiv:'Already Have an Account',dropdown:'Sign In', firstitem:'Login', firsthref:'/login',
                   seconddiv:`Don't Have Account`, seconditem:'Register', secondhref:'/register'}
const afterlogin={firstdiv:'My Profile', firstitem:'profile', firsthref:'/profile',
                   seconddiv:`Logout`, seconditem:'Logout', secondhref:'/logout',dropdown:'Profile'}
var afterloginpro={firstdiv:'My Profile', firstitem:'profile', firsthref:'/profile',
                   seconddiv:`Logout`, seconditem:'Logout', secondhref:'/logout',dropdown:'Profile',userid:user,email:"", objdata:{}, transactions:{}}
                   let obj={userid:"",email:""};
var userid="abc";
app.get('/', (req, res)=>{
    if(loggedin==false){
    res.render('HomePage', beforelogin);}
    else{res.render('HomePage', afterlogin);}
});

app.get('/contact', (req, res)=>{
    if(loggedin==false){
        res.render('ContactUs', beforelogin);}
        else{res.render('ContactUs', afterlogin);}
})

app.get('/bookticket', (req, res)=>{
    if(loggedin==false){
        res.render('mywebsite', beforelogin);}
        else{res.render('mywebsite', afterlogin);}
});

let sql_states=`select distinct state from stadium_details order by state ASC`;

app.get('/bookticketnow', (req, res)=>{
    if(loggedin==false){
        res.render('login', loginnothing);}
        else{   
                con.query(sql_states, (err, results)=>{
                const afterlogin_details={firstdiv:'My Profile', firstitem:'profile', firsthref:'/profile',
                seconddiv:`Logout`, seconditem:'Logout', secondhref:'/logout',dropdown:'Profile',arr:results, userid:`${userid}`}
                res.render('bookticketinterface', afterlogin_details);
               })
                
        }
});
emailoruserid="ab";
app.get('/get_data', function(request, response, next){
    var type=request.query.type;
    var search_query=request.query.parent_value;
    var data_obj={match_name:""};
    if(type=='load_city'){
        var query=`
        select  distinct city AS Data from stadium_details where state='${search_query}' order by city ASC
        `;
    }
    if(type=='load_stadium'){
        var query=`
        select stadium_name AS Data from stadium_details where city='${search_query}' order by stadium_name ASC
        `;
    }
    if(type=='load_matchname'){
        var query=`
        select match_name AS Data from match_details where stadium_name='${search_query}' order by match_name ASC
        `;
    }
    if(type=='load_date'){
        var query=`
        select date_of_match AS Data from match_details where match_name='${search_query}'
        `;
        data_obj.match_name=search_query;
    }
   
    con.query(query, (error, Data)=>{
        if(error) throw error;
        var data_arr=[];
        Data.forEach(function(row){
            if(type=='load_date'){
                let istDate = moment(row.Data);
                let ist=istDate.format("YYYY-MM-DD HH:mm:ss")
                data_arr.push(ist);
            }
            else{
            data_arr.push(row.Data);}
        });
        if(type=='load_date'){
            let   q1=`select ticket_left from match_details where match_name='${data_obj.match_name}'`;
            con.query(q1, (erro, re)=>{
                if(erro) throw erro;
                data_arr.push(re[0].ticket_left);
               let q2=`select price from match_details where match_name='${data_obj.match_name}'`;
               con.query(q2, (e, r)=>{
                    if(e) throw e;
                    data_arr.push(r[0].price); 
                    response.json(data_arr);
               })
                
               
            });
            
        }
        else{response.json(data_arr);}

        
    });
});

app.get('/profile', (req, res)=>{
    if(loggedin==false){
        res.render('login', loginnothing);}
        else{ let transactionquery=`select matchname, stadium_name, date, seat_count from seatbooking where userid=?`;
        con.query(transactionquery,[userid], (erro, reso)=>{
            if(erro) throw erro;
            afterloginpro.transactions=reso;
             res.render('profile', afterloginpro);
        })}
});


// app.get('/thankyou', (req, res)=>{
//     res.render('thankyou');
// })

app.get('/logout', (req, res)=>{
        loggedin=false;
        console.log('logged out successfully');
        res.render('login',loginnothing);
       
});

const loginnothing={firstdiv:'Already Have an Account', firstitem:'Login', firsthref:'/login',
                   seconddiv:`Don't Have Account`, seconditem:'Register', secondhref:'/register',status:'',dropdown:'Sign In'}
const loginerror={firstdiv:'Already Have an Account', firstitem:'Login', firsthref:'/login',
                   seconddiv:`Don't Have Account`, seconditem:'Register', secondhref:'/register',status:'Invalid User id or Password',dropdown:'Sign In'}


app.get('/login', (req, res)=>{
    if(loggedin==false){
        res.render('login', loginnothing);}
        else{
            let transactionquery=`select matchname, stadium_name, date, seat_count from seatbooking where userid=?`;
                        con.query(transactionquery,[userid], (erro, reso)=>{
                            if(erro) throw erro;
                            afterloginpro.transactions=reso;
                             res.render('profile', afterloginpro);
                        })}
})
const emailalready={emailvalidation:"Email already registered",useridvalidation:"",registrationconfirmation:"",firstdiv:'Already Have an Account', firstitem:'Login', firsthref:'/login',
seconddiv:`Don't Have Account`, seconditem:'Register', secondhref:'/register',dropdown:'Sign In'};
const useridalready={emailvalidation:"",useridvalidation:"user id already registered",registrationconfirmation:"",firstdiv:'Already Have an Account', firstitem:'Login', firsthref:'/login',
seconddiv:`Don't Have Account`, seconditem:'Register', secondhref:'/register',dropdown:'Sign In'}
const successful={emailvalidation:"",useridvalidation:"",registrationconfirmation:"Registered successfully",firstdiv:'Already Have an Account', firstitem:'Login', firsthref:'/login',
seconddiv:`Don't Have Account`, seconditem:'Register', secondhref:'/register',dropdown:'Sign In'}
const nothingbefore={emailvalidation:"",useridvalidation:"",registrationconfirmation:"",firstdiv:'Already Have an Account', firstitem:'Login', firsthref:'/login',
seconddiv:`Don't Have Account`, seconditem:'Register', secondhref:'/register',dropdown:'Sign In'}
const nothingafter={emailvalidation:"",useridvalidation:"",registrationconfirmation:"",firstdiv:'My Profile', firstitem:'profile', firsthref:'/profile',
seconddiv:`Logout`, seconditem:'Logout', secondhref:'/logout',dropdown:'Profile'}
app.get('/register', (req, res)=>{
    if(loggedin==false){
        res.render('register', nothingbefore);}
        else{ let transactionquery=`select matchname, stadium_name, date, seat_count from seatbooking where userid=?`;
        con.query(transactionquery,[userid], (erro, reso)=>{
            if(erro) throw erro;
            afterloginpro.transactions=reso;
             res.render('profile', afterloginpro);
        })}
})


app.post('/register', (req, res)=>{

     let email=req.body.email;
     let password=req.body.password;
     let userid=req.body.userid;
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
                         console.log("registered success fully ");
                         let adduser=`insert into user_details (email) values (?)`;
                         con.query(adduser,[email],(errrrr, ressss)=>{
                            if(errrrr) throw errrrr;
                            console.log('userid added to user_details successfully');
                         });
                         res.render('register',successful);
                     })
                 }
                 else res.render('register', useridalready);
             })
         }
        else{
            res.render('register',emailalready);
         }
     })
    
});

app.post('/form-submitted', (req, res)=>{
    let stadium_name=req.body.stadium;
    let matchname=req.body.matchname;
    let date=req.body.date;
    let userid=req.body.name;
    let seat_count=req.body.seat_count;
    seat_count=parseInt(seat_count);
    let sql=`insert into seatbooking (userid, matchname, stadium_name, date, seat_count) values (?, ?, ?, ?, ?)`;
    con.query(sql,[userid, matchname, stadium_name, date, seat_count], (err, re)=>{
        if(err) throw err;
         console.log("ticket booked successfully");
        let ticketdet=req.body
        res.render('thankyou', {ticketdet});
       
    });
})



var loggedin=false;
var userid="ab";
app.post('/profile', (req, res)=>{
    if(loggedin==false){
    var emailoruserid=req.body.emailoruserid;
    userid=emailoruserid;
    let password=req.body.password;
    let fetchemail=`select email, password from register where email=? and password=?`;
    let fetchuserid=`select userid, password from register where userid=? and password=?`;
    con.query(fetchemail,[emailoruserid, password] ,(err, result)=>{
        if(err) throw err;
       
        if(result[0]==undefined){
            con.query(fetchuserid, [emailoruserid, password],(er, resul)=>{
                if(er) throw er
                if(resul[0]==undefined){
                    res.render('login', loginerror);
                }
                else{
                    loggedin=true;
                    console.log("logged in successfully kdl");
                    
                    let fetchemail1=`select email from register where userid=?`;
                    con.query(fetchemail1,[emailoruserid], (errr, ress)=>{
                        if(errr) throw errr;
                        afterloginpro.email=ress[0].email;
                        afterloginpro.userid=emailoruserid;
                        let details=`select * from user_details where email=?`;
                    con.query(details, [afterloginpro.email], (errrr, resss)=>{
                        if(errrr) throw errrr;
                        let objdata=resss[0];
                        afterloginpro.objdata=objdata;
                        userid=emailoruserid;
                        let transactionquery=`select matchname, stadium_name, date, seat_count from seatbooking where userid=?`;
                        con.query(transactionquery,[userid], (erro, reso)=>{
                            if(erro) throw erro;
                            afterloginpro.transactions=reso;
                             res.render('profile', afterloginpro);
                        });
                       
                    });
                    
                    });
                    
                }
            })
        }
        else{
            console.log("logged in successfully");
            loggedin=true;
            let fetchuser=`select userid from register where email=?`;
            con.query(fetchuser,[result[0].email],(error, re)=>{
                if(error) throw error;
                user=re[0].userid;
                afterloginpro.userid=user;
                afterloginpro.email=result[0].email;
                let details=`select * from user_details where email=?`;
                    con.query(details, [afterloginpro.email], (errrr, resss)=>{
                        if(errrr) throw errrr;
                        let objdata=resss[0];
                        afterloginpro.objdata=objdata;
                        userid=re[0].userid;
                        let transactionquery=`select matchname, stadium_name, date, seat_count from seatbooking where userid=?`;
                        con.query(transactionquery,[userid], (erro, reso)=>{
                            if(erro) throw erro;
                            afterloginpro.transactions=reso;
                             res.render('profile', afterloginpro);
                        })
                    })
            });
            
            
        }
    })}

    else res.render('profile', afterloginpro);
})



app.post('/details_edited_successfully', (request1, response1)=>{
    let arr=[];
    for(i in request1.body){
        arr.push(request1.body[i]);
    }
    afterloginpro.objdata=request1.body;
    let del=`delete from user_details where email=?`;
    con.query(del,[request1.body.email],(er, re)=>{
        if(er) throw er;
        console.log('data deleted successfully');
    });
    let que=`insert into user_details (email, phone_number, user_name, gender, adhar_card, pincode, address, landmark, city, state) values (?)`;
    con.query(que,[arr], (e, r)=>{
        if(e) throw e;
        console.log('personal details updated successfully');
    })
    response1.render('profile', afterloginpro);
})

app.get('*', (req, res)=>{
    res.render('notfound');
})

app.listen(3000, (err)=>{
    if(err) throw err;
    console.log("Server is running");
})