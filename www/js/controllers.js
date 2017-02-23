angular.module('starter.controllers', [])
  
.controller('inicioCtrl', function($scope, $stateParams, $cordovaGeolocation) {
	var mapOptions = {
		center: new google.maps.LatLng(4.624335, -74.063644),
	    zoom: 15,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var options = {timeout: 10000, enableHighAccuracy: false};

  	$cordovaGeolocation.getCurrentPosition(options).then(function(position) {
		$scope.ubicacion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var marker = new google.maps.Marker({position:latLng,  map: $scope.map});
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
   
.controller('registrarCrimenCtrl', function($scope, $stateParams, $cordovaCamera, UserService, DataService) {
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

	$scope.registrar = function(formData){
		var user = UserService.getUser();
		DataService.registerCrime(user.uid, formData.tipo, formData.descrip, formData.infoPol, formData.infoBomb, $scope.imageSrc).then(function (res) {
			$state.go('menu.inicio');
		});

	}
})
   
.controller('menuCtrl', function($scope, $stateParams) {


})
   
.controller('loginCtrl', function($scope, $stateParams, UserService) {
	$scope.loginData = {};

	$scope.doLogin = function() {
		UserService.login($scope.loginData.username, $scope.loginData.password).then(function(){
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
   
.controller('registrarseCtrl', function($scope, $stateParams) {
	$scope.registerData = {};

	$scope.doRegister = function() {
		console.log(registerData.password);
		UserService.registerUser($scope.registerData.username, $scope.registerData.password).then(function(){
			$state.go('menu.inicio');
		}
		).catch(function(error){
			console.log(error);
		});
	};
})
   
.controller('configuraciNCtrl', function($scope, $stateParams) {


});
 