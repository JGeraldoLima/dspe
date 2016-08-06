'use strict';

angular.module('dspeApp', ['dspeApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'ui.bootstrap'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
