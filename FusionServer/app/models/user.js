// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var rimraf = require('rimraf');

// define the schema for our user model
var userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String,
    language: String,
    email: String,
    defaultprogramminglanguage: String,
    filepath: {
        type: String,
        required: true
    },
    securityquestion: {
        type: String,
        required: true
    },
    securityanswer: {
        type: String,
        required: true
    },
    usergroup: {
        type: String,
        required: true
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// checking if security answer is valid
userSchema.methods.validSecurityAnswer = function(answer){
    return (this.securityanswer == answer);
}

//Creating the correct file path and fylesystem
userSchema.methods.generateFileSystem = function (username) {

    var editorFilePath = "/Editor";
    var blocklyFilePath = "/Blockly";
    var filepath = "app/filesystem/" + username;

    fs.mkdir(filepath, function (err) {
        if (err)
            console.log('error creating root folder', err);

        fs.mkdir(filepath + editorFilePath, function (err2) {
            if (err2)
                console.log('error creating editor file', err2);
        });

        fs.mkdir(filepath + blocklyFilePath, function (err2) {
            if (err2)
                console.log('error creating blockly file', err2);
        });
    });

    return filepath;

}

userSchema.statics.removeFileSystem = function (username) {

    var filepath = "app/filesystem/" + username;

    rimraf(filepath, function () {
        console.log('Finished Deleting User Directory');
    });

}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);