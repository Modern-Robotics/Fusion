angular
    .module('fusionApp')
    .factory('editorFactory', ['$http', 'appFactory', 'userFactory', 'socketFactory', function ($http, appFactory, userFactory, socketFactory) {

        var Editor = {};

        Editor.programmingLanguages = ['Python']


        // HTTP Requests ================================================

        // Get All User Programs
        Editor.GetPrograms = function () {
            return $http.get('/api/programs')
                .then(function (response) {
                    if (response.data.length == 0)
                        appFactory.showToast('User has no saved programs', 'error');
                    return response.data;
                }, function (error) {
                    return error;
                });
        }

        // Get Single User Program
        Editor.GetProgram = function (ProgramId) {
            return $http.get('/api/programs/' + ProgramId)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error;
                });
        }

        // Create a program
        Editor.CreateProgram = function (data) {
            return $http.post('/api/programs', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });
        }

        // Delete a program
        Editor.DeleteProgram = function (ProgramId) {
            return $http.delete('/api/programs/' + ProgramId)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    throw 'File Does Not Exist';
                });
        }

        // Update a program
        Editor.UpdateProgram = function (ProgramId, data) {
            return $http.put('/api/programs/' + ProgramId, data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }

        // Start a program
        Editor.StartProgram = function (ProgramId) {

            var data = {
                socketId: socketFactory.Socket.id
            }

            return $http.post('/api/programs/start/' + ProgramId, data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });

        }

        // Stop a program
        Editor.StopProgram = function () {

            return $http.post('/api/programs/stop')
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });

        }

        // Get Example program code
        Editor.GetExampleCode = function (data) {

            return $http.post('/api/samplePrograms', data)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error;
                });

        }

        // Run Example program
        Editor.RunExample = function (filePath) {

            var data = {
                filepath: filePath,
                socketId: socketFactory.Socket.id
            }

            return $http.post('api/samplePrograms/run', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });

        }


        // Helper Methods ===============================================

        // Adds program to working files
        Editor.addToWorkingFiles = function (data) {

            for (var i = 0; i < userFactory.User.workingEditorFiles.length; i++)
                userFactory.User.workingEditorFiles[i].Selected = false;

            userFactory.User.workingEditorFiles.push({
                Name: data.filename,
                Code: data.code,
                NeedsSaving: false,
                Filepath: userFactory.User.filepath + '/Editor/' + data.filename,
                Selected: true
            });

        }

        // Removes program from working files
        Editor.removeFromWorkingFiles = function (filename) {

            for (var i = 0; i < userFactory.User.workingEditorFiles.length; i++) {

                if (userFactory.User.workingEditorFiles[i].Name == filename) {

                    userFactory.User.workingEditorFiles.splice(i, 1);

                }

            }

        }


        return Editor;

    }]);
