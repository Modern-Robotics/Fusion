angular
    .module('fusionApp')
    .factory('settingsFactory', ['$http', '$interval', 'appFactory', 'userFactory', function ($http, $interval, appFactory, userFactory) {

        var settings = {};

        // User Methods =======================================

        // Create user
        settings.CreateUser = function (data) {
            return $http.post('/api/admin/users', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return null;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return data;
                });
        }

        // Delete user
        settings.DeleteUser = function (UserId) {
            return $http.delete('/api/users/' + UserId)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error;
                });
        }


        // Wifi Settings ======================================

        // Get Wifi Settings
        settings.GetWifiSettings = function () {
            return $http.get('/api/admin/wirelessSettings')
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error.data;
                });
        }

        // Set Wifi Settings
        settings.SetWifiSettings = function (data) {

            return $http.post('/api/admin/wirelessSettings', data)
                .then(function (response) {

                    //Show success message
                    appFactory.showToast(response.data.serverMessage, "success");

                    //Return success data
                    return response.data;

                }, function (error) {

                    //Show error message
                    appFactory.showToast(error.serverMessage, "error");

                });

        }

        // Wireless Connections ==============================

        // Get Wireless Connections
        settings.GetWirelessConnections = function () {
            return $http.get('/api/admin/wirelessConnections')
                .then(function (response) {
                    return response.data.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return [];
                });
        }

        // Connect to wireless connection
        settings.SetWirelessConnection = function (data) {
            return $http.post('/api/admin/wirelessConnections', data)
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error.data;
                });
        }

        // Disconnect from wireless connection
        settings.DisconnectWirelessConnection = function () {
            return $http.get('/api/admin/wirelessConnections/disconnect')
                .then(function (response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return response.data;
                }, function (error) {
                    appFactory.showToast(error.data, 'error');
                    return error.data;
                });
        }


        //Get Spartan Pi Settings
        settings.getSpartanPiSettings = function () {
            return $http.post(appFactory.data.BaseUrl + "getSettings", {}).then(function (response) {

                //Return Data
                return response.data;

            }, function (error) {

                //Show error message
                toastFactory.showMessage(error.data, "red");

            });
        };

        //Set Spartan Pi Settings
        settings.setSpartanPiSettings = function (wifiName, wifiPassword) {

            var postData = {
                wifiName: wifiName,
                wifiPassword: wifiPassword
            }

            return $http.post(appFactory.data.BaseUrl + "setSettings", postData).then(function (response) {

                //Show success message
                toastFactory.showMessage("Settings updated successfully", "green");

                //Return success data
                return response.data;


            }, function (error) {

                //Show error message
                toastFactory.showMessage(error.data, "red");

            });
        };

        //Get Spartan Pi Users
        settings.getSpartanPiUsers = function () {



        };

        //Get Latest Spartan Pi Version
        settings.getLatestSpartanPiVersion = function () {

            return $http.get(appFactory.data.MriUrl + "SpartanPis/getLatestRelease", {}).then(function (response) {

                //Return success data
                return response.data;

            }, function (error) {

                toastFactory.showMessage(error.data, "red");

            });

        }

        // Get autonomous program
        settings.getAutonomousProgram = function() {
            return $http.get('/api/autonomous')
                .then(function(response){
                    return response.data;
                }, function(error){
                    appFactory.showToast(error.message, 'error');
                });
        };

        // Set autonomus program
        settings.setAutonomousProgram = function(enable, user, programType, program) {
            return $http.post('/api/autonomous', {'active': enable, 'user': user, 'type': programType, 'program': program})
                .then(function(response) {
                    appFactory.showToast(response.data.serverMessage, 'success');
                    return;
                }, function(error) {
                    appFactory.showToast(error.message, 'error');
                    return;
                });

        };

        // Get available autonomous programs
        settings.getAvailableAutonomousPrograms = function(user, type) {
            if (!user) {
                appFactory.showToast('Please select a user first', 'error');
            } else if (!type) {
                appFactory.showToast('Please select a program type', 'error');
            } else {
                return $http.post('/api/autonomousPrograms', {'username': user, 'type': type})
                    .then(function(response){
                        return response.data.files;
                    }, function(error){
                        appFactory.showToast(error.message, 'error');
                    });
            }            
        };

        return settings;

}]);
