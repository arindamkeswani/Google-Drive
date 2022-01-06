////////////////////////////////////////

/////////// IGNORE THIS FILE //////////

////////////////////////////////////////

const { mongo_uri } = require("../secrets")
const bcrypt = require('bcrypt');

const mongoose = require("mongoose");


const db_link = mongo_uri
mongoose
    .connect(db_link)
    .then(function (db) {
        // console.log(db);
        console.log("user db connected");
    })
    .catch(function (err) {
        console.log(err);
    });



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.confirmPassword == this.password
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    data:{
        type: Object
    },
    resetToken: String
});

