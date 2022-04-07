// app/models/user.js
// load the things we need
let mongoose    = require('mongoose');
let bcrypt      = require('bcrypt-nodejs');
let fs          = require('fs-extra');
let rimraf      = require('rimraf');
const logger    = require('./../utils/logger');

// define the schema for our user model
let userSchema = mongoose.Schema({

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
    return new Promise(async function(resolve, reject){

        var editorFilePath = "/Editor";
        var blocklyFilePath = "/Blockly";
        var filepath = "app/filesystem/" + username;

        try {

            await fs.mkdirp(filepath);
            await fs.mkdirp(filepath + editorFilePath);
            await fs.mkdirp(filepath + blocklyFilePath);

            return resolve(filepath);

        } catch (err) {

            logger.error('Error creating file system for user: ' + err);
            return reject(err);

        }

    });

}

userSchema.statics.removeFileSystem = function (username) {

    var filepath = "app/filesystem/" + username;

    rimraf(filepath, function () {
        logger.info('Finished Deleting User Directory');
    });

}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);