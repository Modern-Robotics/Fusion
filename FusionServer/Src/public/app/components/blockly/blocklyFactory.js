angular
    .module('fusionApp')
    .factory('blocklyFactory', ['$http', 'appFactory', 'socketFactory', function ($http, appFactory, socketFactory) {

        var Blockly = {};
        
        Blockly.newFileCounter = 1;
        
        
        // HTTP Requests ================================================
        
        // Get All Blockly Programs
        Blockly.GetPrograms = function(){
            return $http.get('/api/blockly')
                .then(function (response) {
                    if (response.data.length == 0)
                        appFactory.showToast('User has no saved programs', 'error');
                    return response.data;
                }, function (error) {
                    return error;
                });
        }
        
        // Get Single Blockly Program
        Blockly.GetProgram = function(ProgramId){
            return $http.get('/api/blockly/' + ProgramId)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error;
                });
        }
        
        // Create a Blockly Program
        Blockly.CreateProgram = function(data){
            return $http.post('/api/blockly', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });
        }
        
        // Delete a Blockly Program
        Blockly.DeleteProgram = function(ProgramId){
            return $http.delete('/api/blockly/' + ProgramId)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });
        }
        
        // Update a Blockly Program
        Blockly.UpdateProgram = function(ProgramId, data){
            return $http.put('/api/blockly/' + ProgramId, data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });
        }
        
        // Start a Blockly Program
        Blockly.StartProgram = function(data){
            
            data.socketId = socketFactory.Socket.id;
            
            return $http.post('/api/blockly/start', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });
        }
        
        // Stop a Blockly Program
        Blockly.StopProgram = function(){
            return $http.post('/api/blockly/stop')
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });
        }
        
        // Get Example Code
        Blockly.GetExampleCode = function(data){
            
            return $http.post('/api/blocklySamplePrograms', data)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error;
                });
            
        }

        return Blockly;

    }]);