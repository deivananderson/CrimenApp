angular.module('starter.controllers', [])


.controller('inicioCtrl', function($scope, $state, $stateParams, $cordovaGeolocation) {

	var mapOptions = {
		center: new google.maps.LatLng(4.624335, -74.063644),
	    zoom: 15,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
	$scope.ubicacion = new google.maps.LatLng(0, 0);

	console.log($scope.ubicacion.lat());

	var options = {timeout: 10000, enableHighAccuracy: false};

  	$cordovaGeolocation.getCurrentPosition(options).then(function(position) {
		$scope.ubicacion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var marker = new google.maps.Marker({position:$scope.ubicacion,  map: $scope.map});
		$scope.map.setCenter($scope.ubicacion);

	}, function (error) {
		console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	});


})

.controller('incidentesCtrl', function($scope, $stateParams) {


})

.controller('reportesCtrl', function($scope, $stateParams) {


})

.controller('camaraCtrl', function($scope, $stateParams) {

})

.controller('registrarCrimenCtrl', function($scope, $state, $stateParams, $cordovaCamera, $ionicPopup, $timeout, UserService, DataService) {

	$scope.formData = {};


	$scope.takePhoto = function(){
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: false,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 150,
			targetHeight: 150,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false,
			correctOrientation:true
		};

		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.imageSrc = "data:image/jpeg;base64," + imageData;
		}, function(err) {
		// error
		});
	};

	$scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'REGISTRO EXITOSO DE:',
       template: $scope.formData.tipo
     });

     alertPopup.then(function(res) {
       console.log('Registro exitoso');
     });
   };

   $scope.showAlertFail = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Ingrese un crimen',
        });

        alertPopup.then(function(res) {
          console.log('fail crimen');
        });
   };

	$scope.registrar = function(){
    console.log("llegue registrar");
		var user = UserService.getUser();
		console.log($scope.formData.tipo);
		if($scope.formData.tipo==null){
		    console.log("sin informacion");
		    $scope.showAlertFail();
		}
		else{
		  DataService.registerCrime(user.uid, $scope.formData.tipo, $scope.formData.descrip, $scope.formData.infoPol, $scope.formData.infoBomb, $scope.ubicacion.lat(), $scope.ubicacion.lgn()).then(function (res) {
      			$state.go('menu.inicio');
      			$scope.showAlert();
      		});
		}

	};


})

.controller('menuCtrl', function($scope, $stateParams) {


})

.controller('loginCtrl', function($scope, $state, $stateParams, UserService) {

	$scope.loginData = {};

	$scope.doLogin = function() {
		UserService.login($scope.loginData.username, $scope.loginData.password).then(function(){
			//
			console.log("Menu inicio");
	        $state.go('menu.inicio');
	      }
	    ).catch(function(error){
	      console.log(error);
	    });
	}

})

.controller('recuperarContraseACtrl', function($scope, $stateParams) {


})

.controller('confirmaciNEnvioCtrl', function($scope, $stateParams) {


})

.controller('confirmaciNRegistroCtrl', function($scope, $stateParams) {


})


.controller('registrarseCtrl', function($scope, $state, $stateParams, UserService, $ionicPopup, $timeout) {

	$scope.registerData = {};
  $scope.user={};

  $scope.showAlertRegistro = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'REGISTRO EXITOSO:',
       });

       alertPopup.then(function(res) {
         console.log('Registro exitoso');
       });
     };

  $scope.showAlertRegistroFail = function(data) {
         var alertPopup = $ionicPopup.alert({
           title: 'ERROR REGISTRO:',
           template: 'Ya existe una cuenta con este email'
         });

         alertPopup.then(function(res) {
           console.log('Registro exitoso');
         });
       };

	$scope.doRegister = function() {
		  UserService.registerUser($scope.registerData.username, $scope.registerData.password).then(function(){
	    $scope.user.titulo=$scope.registerData.username;
	    console.log("registrado");
			$state.go('menu.inicio');
			$scope.showAlertRegistro();
		}
		).catch(function(error){
			console.log(error);
			$scope.showAlertRegistroFail(error);
		});
	};
})

.controller('configuraciNCtrl', function($scope, $stateParams) {


});
