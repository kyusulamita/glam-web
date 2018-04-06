var app = angular.module('glamsquad', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: '/',
      template: 'Welcome to Glamsquad'
    })
    .state('services', {
      url: '/services',
      templateUrl: '/public/templates/services.html',
    })
    .state('user', {
      url: '/users/:id',
      templateUrl: '/public/templates/appointment.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/public/templates/login.html',
      controller: 'LoginCtrl',
    })
    .state('appointments', {
      url: '/appointments',
      templateUrl: '/public/templates/appointments.html',
      controller: 'AppointmentCtrl',
    })
    $urlRouterProvider.otherwise('/');

});

