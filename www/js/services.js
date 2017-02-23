angular.module('starter.services', [])

.factory('BlankFactory', [function(){

}])

.service('Ubicacion', function () {
	var ubicacion = new google.maps.LatLng(4.624335, -74.063644);

	return{
		setUbicacion: function(ub){
			ubicacion = ub;
		},
		getUbicacion: function(){
			return ubicacion;
		}
	} 
})

.service('UserService', function ($firebaseAuth, $q) {
	var auth = $firebaseAuth();

	return{
		registerUser: function (username, password) {
			$defer = $q.defer();

			auth.$createUserWithEmailAndPassword(username, password).then(function () {
				$defer.resolve();
			}).catch(function(error){
				$defer.reject(error);   
			});

			return $defer.promise;
		},
		login: function (username, password) {
			$defer = $q.defer();            

			auth.$signInWithEmailAndPassword(username, password).then(function () {
				$defer.resolve();
			}).catch(function(error){
				$defer.reject(error);               
			});

			return $defer.promise;
		}, 
		getUser: function(){
			return auth.$getAuth();
		}
	}
})

.service('DataService', function ($firebaseObject, $firebaseArray, $q) {
	var firebaseRef = firebase.database().ref();

	return{
		registerCrime: function (userId, crimeType, description, infoPolice, infoFirefighters, image, lat, lng) {
			$defer = $q.defer();			

			firebaseRef.child('crimeList').push({
				name: crimeType,
				userId: userId,
				description: description,
				infoPolice: infoPolice,
				infoFirefighters: infoFirefighters,
				imageReport: image,
				lat: lat,
				lng: lng
			}).then(function (res) {
				$defer.resolve(res);                
			}).catch(function(error){
				$defer.reject(error);  
			});

			

			return $defer.promise;
		},
		getCrimeList: function (userId) {
			$defer = $q.defer();
			$crimenes = [];
			
          	var crimeList = $firebaseArray(firebaseRef.child('crimeList'));
			crimeList.$loaded().then(function (list) {
				$defer.resolve(list);
			}).catch(function (err) {
				$defer.reject(err);
			});

			return $defer.promise;
		}
	}
})