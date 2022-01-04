const { query } = require('express');
const mysql = require('mysql');
const {pool} = require('../app')

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
        parent_folder = "root"
        result = []
        connection.query('SELECT * FROM folders where user_id=1 AND parent_folder=?; SELECT * FROM notepads where user_id=1 AND parent_folder=?', [parent_folder, parent_folder], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if (!err) {

                // result.push(rows)
                res.send({
                    query_returned: rows
                })
                console.log("Rows in folder:",rows);
            } else {
                console.log(err);
            }

        });

        // connection.query('SELECT * FROM notepads where user_id=1 AND parent_folder=?', [parent_folder], (err, rows) => {
        //     connection.release();

        //     if (!err) {

        //         // result.push(rows)
        //         res.write(
        //             JSON.stringify({query_returned: rows})
        //         )
        //         // console.log("Rows in folder:",rows);
        //     } else {
        //         console.log(err);
        //     }
        // });

    })
};

exports.viewNotepads = (req, res) => {
    // res.render('home');


    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (data controller View DB ): ', connection.threadId);


        // use the connection
        parent_folder = "root"


        connection.query('SELECT * FROM notepads where user_id=1 AND parent_folder=?', [parent_folder], (err, rows) => {
            connection.release();

            if (!err) {

                // result.push(rows)
                res.send(
                    { query_returned: rows }
                )
                console.log("Rows in folder:", rows);
            } else {
                console.log(err);
            }
        });

    })
};
