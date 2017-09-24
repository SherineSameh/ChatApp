var app = angular.module('chatApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        '': {
          templateUrl: 'public/directives/home.html',
          controller: 'chatCtrl'
        },
        'left-header@home': {
          templateUrl: 'public/partials/_header-left.html'
        },
        'right-header@home': {
          templateUrl: 'public/partials/_header-right.html'
        },
        'navbar@home': {
          templateUrl: 'public/partials/_navbar.html'
        },
        'chat-box@home': {
          templateUrl: 'public/partials/_chat-box.html'
        }
      }
    });
}).config(function($locationProvider) {
  $locationProvider.hashPrefix('!');
}).run(function($location) {
  $location.path('/');
});
