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

        const uid = new ShortUniqueId()
        // console.log(uid());
        // console.log('Connected as ID (data controller Save in DB): ', connection.threadId);

        parent_folder = req.body.parent_folder;
        timestamp = Date.now()
        unique_id = uid()

        if (req.body.folder_name) {
            connection.query('INSERT INTO folders (id, user_id, folder_name, parent_folder, creation_date) VALUES (?,?,?,?,?);', [unique_id, 1, req.body.folder_name, parent_folder, timestamp], (err, rows) => {
                connection.release();
            })
        }
        else if (req.body.file_name) {
            if (req.body.ext == ".txt") {

                fileName = req.body.file_name;
                // console.log(fileName);
                fontSize = req.body.font_size;
                // console.log(fontSize);
                fontfamily = req.body.font_family;
                // console.log(fontfamily);
                isBold = req.body.is_bold;
                // console.log(isBold);
                isItalic = req.body.is_italic;
                // console.log(isItalic);
                content = req.body.content;
                // console.log(content);

                connection.query('INSERT INTO notepads (id, user_id, file_name, font_size, font_family, bold, italic, content, parent_folder,creation_date) VALUES (?,?,?,?,?,?,?,?,?,?);', [unique_id, 1, fileName, fontSize, fontfamily, isBold, isItalic, content, parent_folder, timestamp], (err, rows) => {
                    if (err)
                        throw err; //not connected

                    connection.release();
                })
            }
        }
    })
}

exports.update = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected

        
        // console.log('Connected as ID (data controller Save in DB): ', connection.threadId);

        
        id = req.body.existing_id;
        console.log("Trying to update note with ID:",id);

        if (req.body.folder_name) {
            connection.query('INSERT INTO folders (id, user_id, folder_name, parent_folder, creation_date) VALUES (?,?,?,?,?);', [unique_id, 1, req.body.folder_name, parent_folder, timestamp], (err, rows) => {
                connection.release();
            })
        }
        else if (req.body.file_name) {
            if (req.body.ext == ".txt") {

                fileName = req.body.file_name;
                // console.log(fileName);
                fontSize = req.body.font_size;
                // console.log(fontSize);
                fontfamily = req.body.font_family;
                // console.log(fontfamily);
                isBold = req.body.is_bold;
                // console.log(isBold);
                isItalic = req.body.is_italic;
                // console.log(isItalic);
                content = req.body.content;
                // console.log(content);

                connection.query('UPDATE notepads SET file_name=?, font_size=?, font_family=?, bold=?, italic=?, content=? WHERE user_id=? AND id=?;', [fileName, fontSize, fontfamily, isBold, isItalic, content, 1, id], (err, rows) => {
                    if (err)
                        throw err; //not connected

                    connection.release();
                })
            }
        }
    })
}
