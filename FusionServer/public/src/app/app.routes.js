angular
    .module('fusionApp')
    .config( ['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        // HTML5 Mode to remove '#' from pathing
        $locationProvider.html5Mode(true);
        
        // Take to login page on start
        $urlRouterProvider.otherwise('/User/Login');

        $stateProvider

        // Register Page =======================================================
            .state('register', {
            url: '/User/Register',
            templateUrl: 'app/components/user/register/register.htm',
            controller: 'registerCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: false,
                AllowGuest: true
            }
        })

        // Account Page =======================================================
        .state('account', {
            url: '/User/Account',
            templateUrl: 'app/components/user/account/account.htm',
            controller: 'accountCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: true,
                AllowGuest: false
            }
        })

        // Login Page ==========================================================
        .state('login', {
            url: '/User/Login',
            templateUrl: 'app/components/user/login/login.htm',
            controller: 'loginCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: false,
                AllowGuest: true
            }
        })
    
        // Account Recovery =====================================================
        .state('recover', {
            url: '/User/Recover',
            templateUrl: 'app/components/user/recover/recover.htm',
            controller: 'recoverCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: false,
                AllowGuest: true
            }
        })

        // Home Page ===========================================================
        .state('home', {
            url: '/Home',
            templateUrl: '/app/components/home/home.htm',
            controller: 'homeCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: false,
                AllowGuest: true
            }
        })

        // Documentation Page ==================================================
        .state('documentation', {
            url: '/Documentation',
            templateUrl: '/app/components/documentation/documentation.htm',
            controller: 'documentationCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: false,
                AllowGuest: true
            }
        })

        // Editor Page =========================================================
        .state('editor', {
            url: '/Editor',
            templateUrl: '/app/components/editor/editor.htm',
            controller: 'editorCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: true,
                AllowGuest: true
            }
        })

        // Blockly Page =========================================================
        .state('blockly', {
            url: '/Blockly',
            templateUrl: '/app/components/blockly/blockly.htm',
            controller: 'blocklyCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: true,
                AllowGuest: true
            }
        })

        // VNC Page =========================================================
        .state('vnc', {
            url: '/VNC',
            templateUrl: '/app/components/vnc/vnc.htm',
            controller: 'vncCtrl',
            data: {
                NeedsAdmin : false,
                NeedsLogin: true,
                AllowGuest: false
            }
        })

        // Settings Page =========================================================
        .state('settings', {
            url: '/Settings',
            templateUrl: '/app/components/settings/settings.htm',
            controller: 'settingsCtrl',
            data: {
                NeedsAdmin : true,
                NeedsLogin: true,
                AllowGuest: false
            }
        });

    }]);