angular
    .module('fusionApp')
    .factory('appFactory', ['$mdToast', '$http', '$mdDialog', function ($mdToast, $http, $mdDialog) {

        var app = {};

        app.data = {
            CurrentPageTitle: '',
            SubTitle: ''
        }

        app.showToast = function (text, type) {
            
            if (!text)
                if (type == 'error' )
                    text = 'Error communicating with server';
            else if (type == 'error' && text.length > 30)
                text = 'Error communicating with server';

            var pinTo = "bottom";
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .position(pinTo)
                .hideDelay(2000)
                .capsule(false)
                .theme(type + "-toast")
            );
        }
        
       
        // Shows a standard alert message
        app.showAlert = function(ev, title, htmlContent){
            
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(title)
                .htmlContent(htmlContent)
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')
                .targetEvent(ev)
            );            
        }
        
        // Power offs the fusion controller
        app.PowerOff = function() {            
            return $http.get('/api/admin/powerOff').then(function(response){
                app.showToast(response.data.serverMessage, 'success');
            }, function(error){
                app.showToast(error, 'error');
            });
        }
        
        // Restarts the fusion controller
        app.Restart = function() {            
            return $http.get('/api/admin/restart').then(function(response){
                app.showToast(response.data.serverMessage, 'success');
            }, function(error){
                app.showToast(error, 'error');
            });            
        }
        
        
        app.updateFusion = function(){
            
            return $http.get('/api/fusion/update', {}).then(function(response){

                app.showToast("Updating...", 'success');

            }, function(error){

                app.showToast("Error updating Fusion", 'error');

            });
            
        }
        
        
        app.restoreFusion = function() {
            
            return $http.get('/api/fusion/restore', {}).then(function(response){

                app.showToast("Restoring...", 'success');

            }, function(error){

                app.showToast("Error updating Fusion", 'error');

            });
            
        }
        
        // Helper methods ============================================
        
        //Change page title
        app.ChangePageTitle = function(title){
            app.data.CurrentPageTitle = title;
        }
        
        //Change page sub title
        app.ChangePageSubTitle = function(title){
            app.data.SubTitle = title;
        }
        
        return app;

    }]);