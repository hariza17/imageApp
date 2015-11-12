angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
     .state('login', {
         url: '/login',
         templateUrl: 'templates/login.html',
         controller:'loginCtrl'
      })

   .state('tab', {
         url: '/tab',
         abstract: true,
         templateUrl: 'templates/tabs.html'
      })
      // Each tab has its own nav history stack:

   .state('tab.buscar', {
         url: '/buscar',
         views: {
            'buscar': {
               templateUrl: 'templates/buscar.html',
               controller: 'buscarCtrl'
            }
         }
      })
      .state('tab.favoritos', {
         url: '/favoritos',
         views: {
            'favoritos': {
               templateUrl: 'templates/favoritos.html',
               controller: 'favoritosCtrl'
            }
         }
      })
      .state('tab.recientes', {
         url: '/recientes',
         views: {
            'recientes': {
               templateUrl: 'templates/recientes.html',
               controller: 'recientesCtrl'
            }
         }
      })

   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/tab/buscar');

});
