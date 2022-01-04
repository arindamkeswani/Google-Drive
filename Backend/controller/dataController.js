const { query } = require('express');
const mysql = require('mysql');
const { pool } = require('../app')
const ShortUniqueId = require('short-unique-id');
const moment = require("moment");

//connection pool
// const pool = mysql.createPool({
//     connectionLimit: 100,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "gdrive",
//     port: 3306,
//     multipleStatements: true
// });


//get root data
exports.view = (req, res) => {
    // res.render('home');


    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (data controller View DB ): ', connection.threadId);


        // use the connection
        parent_folder = req.query.current_folder
        connection.query('SELECT * FROM folders where user_id=1 AND parent_folder=?; SELECT * FROM notepads where user_id=1 AND parent_folder=?', [parent_folder, parent_folder], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if (!err) {
                res.send({
                    query_returned: rows
                })
                // console.log("Rows in folder:", rows);
            } else {
                console.log(err);
            }

        });
    })
};

exports.save = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected

        const uid =  new ShortUniqueId()
        console.log(uid());
        console.log('Connected as ID (data controller Save in DB ): ', connection.threadId);
        console.log(req.body.parent_folder);
        console.log(req.body.folder_name);
        // timestamp = moment().format('YYYY:MM:DD:hh:mm:ss a');
        timestamp = Date.now()
        console.log(timestamp);
        unique_id=uid()
        if(req.body.folder_name){
            connection.query('INSERT INTO folders (id, user_id, folder_name, parent_folder, creation_date) VALUES (?,?,?,?,?);', [unique_id, 1, req.body.folder_name, req.body.parent_folder, timestamp], (err, rows) => {
                
            })
        }
        else if(req.body.file_name){
            connection.query('INSERT INTO notepads (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES ();', [parent_folder, parent_folder], (err, rows) => {
    
            })
        }
    })
}
