const express = require('express');
const { pool } = require('../app')
const mysql = require('mysql');

exports.view = (req, res) => {
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (data controller View DB ): ', connection.threadId);

        // use the connecti

        //query to get contents of the current folder
        connection.query(' SELECT * FROM media where user_id=?',[1], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            // console.log(rows);  
            if (!err) {//Send response, which has data of the selected folder
                res.send({
                    query_returned: rows
                })

            } else {
                console.log(err);
            }

        });
    })
};

// get image data
exports.getMedia = (req, res) => {
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
       

        //query to get contents of the current folder
        
        connection.query('SELECT * FROM media where id=?', [id], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if (!err) {//Send response, which has data of the selected folder
                res.send({
                    query_returned: rows
                })

            } else {
                console.log(err);
            }

        });
    })
}