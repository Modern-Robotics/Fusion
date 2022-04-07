angular
    .module('fusionApp')
    .config(['$mdThemingProvider', '$mdIconProvider', '$mdGestureProvider', '$translateProvider', function ($mdThemingProvider, $mdIconProvider, $mdGestureProvider, $translateProvider) {

        // Sets theme colors
        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('blue')
            .warnPalette('pink')
            .backgroundPalette('grey');
        
        // Register Themes for toasts
        $mdThemingProvider.theme('success-toast');
        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.theme('info-toast');
        
        // For mobile devices without jQuery loaded, do not
        // intercept click events during the capture phase.
        $mdGestureProvider.skipClickHijack();

        //zh-HANS

        // Add translations for i18n support
        $translateProvider
            .useStaticFilesLoader({
                prefix: '/assets/i18n/',
                suffix: '.json'
            })
            // .uniformLanguageTag('bcp47')
            .registerAvailableLanguageKeys(['en', 'es', 'lv', 'zh-HANS', 'zh-HANT'], {
                'en-*': 'en',
                'es-*': 'es',
                'lv-*': 'lv',
                'zh-CN': 'zh-HANS',
                'zh-SG': 'zh-HANS',
                'zh-TW': 'zh-HANT',
                'zh-HK': 'zh-HANT'
              })
            .determinePreferredLanguage()
            .fallbackLanguage('en')
            .useStorage('customStorage')
            //.useLocalStorage()
            // .useCookieStorage()
            .useMissingTranslationHandlerLog()
            .useSanitizeValueStrategy('escape');
        
    }]);
