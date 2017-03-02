angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  .state('menu.inicio', {
    url: '/inicio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inicio.html',
        controller: 'inicioCtrl'
      }
    }
  })

  .state('menu.incidentes', {
    url: '/incidentes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/incidentes.html',
        controller: 'incidentesCtrl'
      }
    }
  })

  .state('menu.reportes', {
    url: '/reportes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/reportes.html',
        controller: 'incidentesCtrl'
      }
    }
  })

  .state('menu.camara', {
    url: '/camara',
    views: {
      'side-menu21': {
        templateUrl: 'templates/camara.html',
        controller: 'camaraCtrl'
      }
    }
  })

  .state('menu.registrarCrimen', {
    url: '/registrarCrimen',
    views: {
      'side-menu21': {
        templateUrl: 'templates/registrarCrimen.html',
        controller: 'registrarCrimenCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('recuperarContraseA', {
    url: '/recuperarContraseña',
    templateUrl: 'templates/recuperarContraseA.html',
    controller: 'recuperarContraseACtrl'
  })

  .state('confirmaciNEnvio', {
    url: '/confirmacionEnvio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmaciNEnvio.html',
        controller: 'confirmaciNEnvioCtrl'
      }
    }
  })

  .state('menu.confirmaciNRegistro', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmaciNRegistro.html',
        controller: 'confirmaciNRegistroCtrl'
      }
    }
  })

  .state('registrarse', {
    url: '/registro',
    templateUrl: 'templates/registrarse.html',
    controller: 'registrarseCtrl'
  })

  .state('menu.configuraciN', {
    url: '/configuracion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/configuraciN.html',
        controller: 'configuraciNCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')



});
