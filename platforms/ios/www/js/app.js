// Ionic Starter App

// List of all verses
// loaded at first load from verses.js
var VERSES;

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// 'ionic.utils' is found in utils.js
angular.module('starter', ['ionic', 'ionic.utils', 'starter.controllers'])

.run(function($ionicPlatform, $localstorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // store locally all verses if not set yet
  if (!$localstorage.getObject('verses').length) {
    $localstorage.setObject('verses', VERSES);
  }

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller : 'HomeCtrl',
          resolve: {
            number : function(VersesService) {
              return VersesService.getNumberOfKnownVerse();
            }
          }
        }
      },
    })

    .state('app.verses', {
      url: "/verses",
      views: {
        'menuContent' :{
          templateUrl: "templates/verses.html",
          controller : 'VersesCtrl',
          resolve: {
            verses: function(VersesService) {
              return VersesService.getVerses();
            }
          }
        }
      }
    })

    .state('app.verse', {
      url: "/verses/:verseId",
      views: {
        'menuContent' :{
          templateUrl: "templates/verse.html",
          controller : 'VerseCtrl',
          resolve: {
            verse: function($stateParams, VersesService) {
              return VersesService.getVerse($stateParams.verseId);
            }
          }
        }
      },
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

