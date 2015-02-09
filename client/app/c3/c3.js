'use strict';

angular.module('serveMeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('c3', {
        url: '/c3',
        templateUrl: 'app/c3/c3.html',
        controller: 'C3Ctrl'
      });
  });