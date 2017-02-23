angular.module('starter.services', [])

.factory('BlankFactory', [function(){

}])

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

.service('DataService', function ($firebaseAuth, $q) {
	var auth = $firebaseAuth();

	return{
		registerCrime: function (userId, crimeType, description, infoPolice, infoFirefighters) {
			$defer = $q.defer();

			firebaseRef.child('crimeList').child(userId).push({
				name: name,
				description: description,
				infoPolice: infoPolice,
				infoFirefighters: infoFirefighters
			}).then(function (res) {
				$defer.resolve(res);                
			}).catch(function(error){
				$defer.reject(error);  
			});

			geoFire = new GeoFire(FirebaseDatabase.getInstance().getReference().child("items_location");
			geoQuery = geoFire.queryAtLocation(geoLocation), radius);
			geoQuery.addGeoQueryEventListener(new GeoQueryEventListener() {
			    public void onKeyEntered(String key, GeoLocation location) {
			         //retrieve data
			    }
			};

			return $defer.promise;
		},
		getCrimeList: function (userId) {
			$defer = $q.defer();            

			firebase.database().ref().child('crimeList').child(userId).once('value', function (snapshot) {
				snapshot.val();
			});

			return $defer.promise;
		}
	}
})