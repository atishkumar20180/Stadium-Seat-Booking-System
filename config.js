const mysql=require('mysql');
require("dotenv").config();
const con=mysql.createConnection({
    host:process.env.HOSTNAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

con.connect((err)=>{
    if(err) throw err;
    console.log('connetcted to database');
})


module.exports=con;