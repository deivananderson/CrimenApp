angular.module('starter.controllers', [])

.controller('inicioCtrl', function($scope, $state, $stateParams, $cordovaGeolocation, Ubicacion) {

	var mapOptions = {
		center: new google.maps.LatLng(4.624335, -74.063644),
	    zoom: 15,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var options = {timeout: 10000, enableHighAccuracy: false};

	$cordovaGeolocation.getCurrentPosition(options).then(function(position) {
		$scope.ubicacion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		Ubicacion.setUbicacion($scope.ubicacion);
		var marker = new google.maps.Marker({position:$scope.ubicacion,  map: $scope.map});
		$scope.map.setCenter($scope.ubicacion);

	}, function (error) {
		console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	});


})

.controller('incidentesCtrl', function($scope, Global, $state, $stateParams, $ionicLoading, UserService, DataService  ) {
	$scope.crimenes = [];

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };

  $scope.show();
	$scope.$on("$ionicView.enter", function (event, data) {
	 	DataService.getCrimeList().then(function (res) {
			$scope.crimenes = res;
      $scope.hide();
		});
	});

  $scope.masDetalle = function(data){
    Global.getData().reporteDet = data;
    $state.go('menu.reportes');      
  };

  
})

.controller('reportesCtrl', function($scope, Global, $state, $stateParams, UserService, DataService) {
  var mapOptions = {
    center: new google.maps.LatLng(4.624335, -74.063644),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };    

  $scope.map = new google.maps.Map(document.getElementById("mapIncidents"), mapOptions);
  

  var poslat = 4.624335;
  var poslng = -74.063644;

  if (Global.getData().reporteDet){
    poslat = Global.getData().reporteDet.lat;
    poslng = Global.getData().reporteDet.lng;
  }

  $scope.ubicacion = new google.maps.LatLng(poslat, poslng);

  var marker = new google.maps.Marker({position:$scope.ubicacion,  map: $scope.map});
  $scope.map.setCenter($scope.ubicacion);

})

.controller('camaraCtrl', function($scope, $stateParams) {

})

.controller('registrarCrimenCtrl', function($scope, $state, $stateParams, $cordovaCamera, $ionicPopup, $timeout, UserService, DataService, Ubicacion) {

	$scope.formData = {};
	$scope.imageSrc="";


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
	  console.log($scope.formData.infoPol, $scope.formData.infoBomb);
	  var policia = $scope.formData.infoPol;
	  var bomberos= $scope.formData.infoBomb;
	  var descripcion = $scope.formData.descrip;
	  if(policia == null){
	    policia=false;
	  }
	  if(bomberos == null){
    	    bomberos=false;
    }
    if(descripcion == null){
      descripcion = "";
    }
    console.log(policia, bomberos);
		var user = UserService.getUser();
		if($scope.formData.tipo==null){
		    console.log("sin informacion");
		    $scope.showAlertFail();
		}
		else{
			var ubicacion = Ubicacion.getUbicacion();
		  	DataService.registerCrime(user.uid, $scope.formData.tipo, descripcion, policia, bomberos, $scope.imageSrc, ubicacion.lat(), ubicacion.lng()).then(function (res) {
      			$state.go('menu.inicio');
      			$scope.showAlert();
      		});
		}

	};


})

.controller('menuCtrl', function($scope, $stateParams) {


})

.controller('loginCtrl', function($scope, $state, $stateParams, $ionicLoading, UserService,$ionicPopup, $timeout) {
	$scope.loginData = {};
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };

  $scope.showLoginFail = function() {
    $scope.hide();
    var alertPopup = $ionicPopup.alert({
      title: 'Ingrese correo y contraseña'
    });
    alertPopup.then(function(res) {
      console.log('fail crimen');
    });
   };

  $scope.showLoginFailError = function(data) {
    $scope.hide();
    var alertPopup = $ionicPopup.alert({
      title: 'Error',
      template: data
    });
    alertPopup.then(function(res) {
      console.log('fail crimen');
    });
  };

	$scope.doLogin = function() {
    $scope.show();
	  if($scope.loginData.username == null || $scope.loginData.password == null){
      $scope.showLoginFail();
    }
    else{
      UserService.login($scope.loginData.username, $scope.loginData.password).then(function(){
        $scope.hide();
        $state.go('menu.inicio');
      }).catch(function(error){
        $scope.showLoginFailError(error);
	      console.log(error);
      });
    }
	}

})

.controller('recuperarContraseACtrl', function($scope, $stateParams) {


})

.controller('confirmaciNEnvioCtrl', function($scope, $stateParams) {


})

.controller('confirmaciNRegistroCtrl', function($scope, $stateParams) {


})


.controller('registrarseCtrl', function($scope, $state, $stateParams, UserService,  $ionicPopup, $timeout) {

	$scope.registerData = {};
  	$scope.user={};

  $scope.showRegistroFail = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Ingrese correo y contraseña'
          });
          alertPopup.then(function(res) {
            console.log(res);
          });
  };
  $scope.showRegistroFailError = function(data) {
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: data
            });
            alertPopup.then(function(res) {
              console.log(res);
            });
  };

	$scope.doRegister = function() {
	    if($scope.registerData.username == null || $scope.registerData.password==null){
	        $scope.showRegistroFail();
	    }
	    else{
	        UserService.registerUser($scope.registerData.username, $scope.registerData.password).then(function(){
          		  $scope.user.titulo=$scope.registerData.username;
          			$state.go('menu.inicio');
          }).catch(function(error){
                $scope.showRegistroFailError(error);
          			console.log(error);
          });
	    }
	};
})

.controller('configuraciNCtrl', function($scope, $stateParams) {


});
