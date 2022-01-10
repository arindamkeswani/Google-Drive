const { query } = require('express');
const mysql = require('mysql');
const { pool } = require('../app')
const ShortUniqueId = require('short-unique-id');
// const Buffer= require('buffer');

const fs = require('fs');

//get root data


exports.view = (req, res) => {
    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (data controller View DB ): ', connection.threadId);

        function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer.from(bitmap).toString('base64');
        }

        // use the connection
        parent_folder = req.query.current_folder

        //query to get contents of the current folder
        connection.query('SELECT * FROM folders where user_id=1 AND parent_folder=?; SELECT * FROM notepads where user_id=1 AND parent_folder=?; SELECT * FROM media where user_id=1 AND parent_folder=?', [parent_folder, parent_folder, parent_folder], (err, rows) => {
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
};

//Save data in the DB
exports.save = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected

        function decodeBase64Image(dataString) 
        {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          var response = {};

          if (matches.length !== 3) 
          {
            return new Error('Invalid input string');
          }

          response.type = matches[1];
          response.data = new Buffer.from(matches[2], 'base64');

          return response;
        }

        const uid = new ShortUniqueId()

        parent_folder = req.body.parent_folder;
        timestamp = Date.now()
        unique_id = uid()

        //Case: New folder is being created
        if (req.body.folder_name) {
            connection.query('INSERT INTO folders (id, user_id, folder_name, parent_folder, creation_date) VALUES (?,?,?,?,?);', [unique_id, 1, req.body.folder_name, parent_folder, timestamp], (err, rows) => {
                connection.release();
            })
        }
        else if (req.body.file_name) { //Case:New file is being created
            if (req.body.ext == ".txt") { //If file is a notepad

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
            //If file is an image/video/gif
            if (req.body.ext == ".jpg" || req.body.ext == ".jpeg" || req.body.ext == ".png" || req.body.ext == ".mp4" || req.body.ext == ".gif") {


                formatted_date = new Date().toDateString();
                user_id = 1;
                url = req.body.url;
                ext = req.body.ext;
                fileName = req.body.file_name;
                path = `Images/${user_id}/${unique_id}${ext}`

                var imageBuffer  = decodeBase64Image(url);
                // console.log(imageBuffer);


                fs.writeFileSync(path,imageBuffer.data);


                connection.query('INSERT INTO media (id, user_id, file_name, url, parent_folder, ext, formatted_date, creation_date) VALUES (?,?,?,?,?,?,?,?);', [unique_id, user_id, fileName, path, parent_folder, ext, formatted_date, timestamp], (err, rows) => {
                    if (err)
                        throw err; //not connected

                    connection.release();
                })
            }
        }
    })
}

//Update existing data
exports.update = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected


        // console.log('Connected as ID (data controller Save in DB): ', connection.threadId);


        id = req.body.existing_id;
        console.log("Trying to update data with ID:", id);

        if (req.body.file_name) { //If data is a file
            if (req.body.ext) { //If contents of a file are to be updated
                if (req.body.ext == ".txt") { //Update text file data

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
                else if (req.body.ext == ".jpg" || req.body.ext == ".jpeg" || req.body.ext == ".mp4") {
                    //update
                    newURL = req.body.url
                    connection.query('UPDATE media SET url=? WHERE user_id=? AND id=?;', [newURL, 1, id], (err, rows) => {
                        if (err)
                            throw err; //not connected

                        connection.release();
                    })
                }
            }

        }
        else { //Case: File/Folder needs to be renamed

            newName = req.body.name;
            fileType = req.body.file_type;
            console.log(newName, fileType);
            if (fileType == "folder") { //Case: if a folder needs to be renamed
                connection.query('UPDATE folders SET folder_name=? WHERE user_id=? AND id=?;', [newName, 1, id], (err, rows) => {
                    if (err)
                        throw err; //not connected
                    connection.release();
                })
            }
            else if (fileType == "notepad") { //Case: if notpad needs to be renamed
                connection.query('UPDATE notepads SET file_name=? WHERE user_id=? AND id=?;', [newName, 1, id], (err, rows) => {
                    if (err)
                        throw err; //not connected

                    connection.release();
                })
            }
            else if (fileType == "media") {//Case: if media needs to be renamed
                connection.query('UPDATE media SET file_name=? WHERE user_id=? AND id=?;', [newName, 1, id], (err, rows) => {
                    if (err)
                        throw err; //not connected

                    connection.release();
                })
            }

        }
    })
}

//Delete data
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected

        //Delete files using post-order traversal
        async function deleteFilesPostOrder(user_id, id, name) {

            connection.query('SELECT * FROM folders WHERE user_id=? AND parent_folder=?;DELETE FROM notepads WHERE user_id=? AND parent_folder=?;DELETE FROM media WHERE user_id=? AND parent_folder=?;', [user_id, id, user_id, id, user_id, id], async (err, rows) => {
                if (err)
                    throw err; //not connected

                // Case 1: Loop over each child folder if there are any and check each for their children to be deleted recursively
                if (rows[0].length > 0) {
                    for (let i = 0; i < rows[0].length; i++) {
                        // console.log(rows[0][i].id, "with the name", rows[0][i].folder_name, "will be sent in the next recursive call to be tested");
                        await deleteFilesPostOrder(user_id, rows[0][i].id, rows[0][i].folder_name)

                    }

                }


                // Base case 1, no children, delete folder
                // connection.query('SELECT * FROM folders WHERE user_id=? AND parent_folder=?;SELECT * FROM notepads WHERE user_id=? AND parent_folder=?;', [user_id, id, user_id, id], async (err, rows) => {
                //     if (err)
                //         throw err; //not connected
                //     console.log(id, name, "has", rows[0].length + rows[1].length, "children folders");
                //     if (rows[0].length == 0 && rows[1].length == 0) {
                //         console.log("delete folder with ID:", id, "as it has no children");
                //         connection.query('DELETE FROM folders WHERE user_id=? AND id=?;', [user_id, id], (err, rows) => {
                //             if (err)
                //                 throw err; //not connected
                //         });
                //         return;
                //     }
                // })

            })
        }

        //Delete empty folders after all their files are deleted
        async function cleanUpFolders(user_id, id, name) {
            connection.query('SELECT * FROM folders WHERE user_id=? AND parent_folder=?;', [user_id, id], async (err, rows) => {
                if (err)
                    throw err;

                //go in post order to delete children
                if (rows.length > 0) {
                    console.log(`Number of original children for ${name}: ${rows.length}`);
                    for (let i = 0; i < rows.length; i++) {
                        console.log("Cleaning up:", rows[i].folder_name);
                        await cleanUpFolders(user_id, rows[i].id, rows[i].folder_name)
                    }
                }
                // return;

                // Delete in post order

                connection.query('DELETE FROM folders WHERE user_id=? AND id=?;', [user_id, id], async (err, rows) => {
                    if (err)
                        throw err;
                    console.log("Deleted", name);
                })



            })
        }


        //delete the appropriate data and its children, if any
        // console.log(req.body);
        id = req.body.existing_id;
        fileType = req.body.file_type;
        console.log("Trying to delete data with ID:", id, "and type:", fileType);

        if (fileType == "folder") { //Case: Folder needs to be deleted
            //delete the folder itself, all children folders, all children files

            connection.query('DELETE FROM folders WHERE id=? AND user_id=?;', [id, 1], (err, rows) => {
                if (err)
                    throw err; //not connected
                deleteFilesPostOrder(1, id, req.body.name)

                //clean up
                connection.query('SELECT * FROM folders WHERE parent_folder=? AND user_id=?;', [id, 1], (err, rows) => {
                    if (err)
                        throw err; //not connected
                    for (let i = 0; i < rows.length; i++) {
                        cleanUpFolders(1, rows[i].id, rows[i].folder_name)
                    }
                })
                connection.release();
            })
        }
        else if (fileType == "notepad") { //Case: Notepad needs to be deleted
            connection.query('DELETE FROM notepads WHERE user_id=? AND id=?;', [1, id], (err, rows) => {
                if (err)
                    throw err; //not connected

                connection.release();
            })
        }
        else if (fileType == "media") { //Case: Media (image or video needs to be deleted)
            connection.query('DELETE FROM media WHERE user_id=? AND id=?;', [1, id], (err, rows) => {
                if (err)
                    throw err; //not connected

                connection.release();
            })
        }

    })
}


