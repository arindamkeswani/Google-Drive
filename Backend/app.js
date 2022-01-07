const express = require("express");
const app = express();
var cors = require('cors');
const mysql = require('mysql');

require('dotenv').config(); //may be used later

// app.use(cors()) ;
app.use(
    cors({
      origin: 'http://localhost:3000'
    })
  );
// app.use(express.static('public/build'));

//middleware func-> post, front-> json
// app.use(express.json()); //global middleware 
// const port=process.env.PORT || 5000;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const port=5000;


//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "gdrive",
    port: 3306,
    multipleStatements: true
});
// const pool = mysql.createPool({
//     connectionLimit: 100,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: "",
//     database: process.env.DB_NAME
// });


//Connect to DB
pool.getConnection((err, connection) => {
    if (err)
        throw err; //not connected
    console.log('Connected as ID: ', connection.threadId);
})
exports.pool = pool

app.listen(port,function(){
    console.log(`Server listening on port ${port}`); 
});

//Importing the router to handle data manipulation
const dataRouter = require('./Routers/dataRouter');
app.use("/",dataRouter);
