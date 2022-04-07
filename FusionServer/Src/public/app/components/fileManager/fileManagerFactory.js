angular
    .module('fusionApp')
    .factory('fileManagerFactory', ['$http', 'appFactory', 'userFactory', function ($http, appFactory, userFactory) {

        var File = {};
        
        // Gets directory
        File.Get = function(data){
            
            data.operation = 'GET';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    return error;
                });
            
        }
        
        File.CreateFile = function(data){
            
            data.operation = 'CREATE_FILE';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.CreateFolder = function(data){
            
            data.operation = 'CREATE_FOLDER';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.MoveFile = function(data){
            
            data.operation = 'MOVE_FILE';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.MoveFolder = function(data){
            
            data.operation = 'MOVE_FOLDER';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.DeleteFile = function(data){
            
            data.operation = 'DELETE_FILE';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.DeleteFolder = function(data){
            
            data.operation = 'DELETE_FOLDER';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.DeleteMulti = function(data){
            
            data.operation = 'DELETE_MULTI';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.RenameFile = function(data){
            
            data.operation = 'RENAME_FILE';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.RenameFolder = function(data){
            
            data.operation = 'RENAME_FILE';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.CopyFile = function(data){
            
            data.operation = 'COPY_FILE';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.CopyFolder = function(data){
            
            data.operation = 'COPY_FOLDER';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.DownloadFile = function(data){
            
            data.operation = 'DOWNLOAD_FILE';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        File.DownloadFolder = function(){
            
            data.operation = 'DOWNLOAD_FOLDER';
            
            return $http.post('/api/files', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data.serverMessage, 'error');
                    throw error.data;
                });
            
        }
        
        return File;

    }]);
