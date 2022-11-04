const mysql=require('mysql');
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'db'
});

con.connect((err)=>{
    if(err) throw err;
    console.log('connetcted to database');
})
module.exports=con;