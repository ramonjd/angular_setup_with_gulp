module.exports = function (config) {
    'use strict';

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            'app/components/angular/angular.js',
            'app/components/angular-mocks/angular-mocks.js',
            'http://maps.google.com/maps/api/js?sensor=false',
            {pattern: 'app/js/**/*.js', included: false},
            {pattern: 'app/components/**/*.js', included: false},
            {pattern: 'app/js/**/*.html'},
            //Tests
            {pattern: 'tests/spec/**/*.js', included: false},

            // Mocks
            //{pattern: 'tests/mocks/*.json', watched: true, served: true, included: false},
            {pattern: 'tests/mocks/**/*.js', included: false},
            //Custom Libraries
            {pattern: 'tests/lib/*.js'},

            // Test config
            'tests/main-test.js'
        ],

        reporters: ['dots', 'coverage', 'junit', 'html'],

        preprocessors: {
            'app/js/**/*.js': 'coverage',
            'app/js/**/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            //prependPrefix: '/test/'
            stripPrefix: 'app'
        },

        junitReporter: {
            outputFile: 'reports/junit/junit.xml',
            suite: 'unit'
        },

        htmlReporter: {
            outputFile: 'reports/junit/junit.html'
        },

        coverageReporter: {
            type: 'html',
            dir: 'reports/junit/coverage'
        },

        // web server port and hostname
        port: 8082,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 10000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
