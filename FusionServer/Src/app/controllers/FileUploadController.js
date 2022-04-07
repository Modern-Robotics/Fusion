// Dependencies
var fs = require('fs');
const logger = require('./../utils/logger');

FileUploadController = function () {};

FileUploadController.prototype.uploadFile = function (req, res) {

  /**
   * The following takes the blob uploaded to an arbitrary location with
   * a random file name and copies it to the specified file.path with the file.name.
   * Note that the file.name should come from your upload request on the client side
   * because when the file is selected it is paired with its name. The file.name is
   * not random nor is the file.path.
   */

  var file = req.files.file;
  var extension = file.name.substr(file.name.length - 3);
  var folder;
  var filePath;

  // Check for specify directory
  if (req.body.workingDirectory) {

    filePath = req.user.filepath.replace(req.user.username + '/', "").replace(req.user.username, "") + req.body.workingDirectory + '/' + file.name;

  } else {

    if (extension == '.py') {
      folder = '/Editor/';
    } else {
      folder = '/Blockly/';
    }

    filePath = req.user.filepath + folder + file.name;

  }

  // Check if file already exists with name
  fs.stat(filePath, function (err, stat) {

    if (err == null) {

      return res.status(500).send('File already exists with name.');

    } else {

      fs.readFile(req.files.file.path, function (err, data) {
        // set the correct path for the file not the temporary one from the API:
        file.path = filePath;

        // copy the data from the req.files.file.path and paste it to file.path
        fs.writeFile(file.path, data, function (err) {
          if (err) {
            return console.warn(err);
          }
          logger.info("The file: " + file.name + " was saved to " + file.path);
          res.status(200).send("File imported successfully.");
        });
      });

    }

  });

};

module.exports = new FileUploadController();