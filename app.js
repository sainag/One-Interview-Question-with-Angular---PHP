var app=angular.module("1Q",[]);
app.controller("1QCtrl",function($scope,$filter,$http){
  $http.get("db.php",{
    params:{"req":"getWorld"}
  }).then(function(response){
	$scope.countryArray=response.data.countries;
	$scope.cityArray=response.data.cities;
  });
  $scope.addToWorld=function(){
    if($scope.countryArray.indexOf($scope.country)==-1){
	  $http({
	    method:"POST",
		url:"db.php",
		params:{"req":"addToWorld","country":$scope.country,"city":$scope.city},
	  }).then(function(response){
		$scope.countryArray.push($scope.country);
		$scope.cityArray.push({"name":$scope.city,"cID":$scope.countryArray.indexOf($scope.country)});	
	  });
	}
	else {
	  var country_city=$filter('filter')($scope.cityArray,{name:$scope.city, cID: $scope.countryArray.indexOf($scope.country)});
	  if(country_city.length==0){
	    $http({
		  method:"POST",
		  url:"db.php",
		  params:{"req":"addToWorld","country":$scope.country,"city":$scope.city},
		}).then(function(response){
		  $scope.cityArray.push({"name":$scope.city,"cID":$scope.countryArray.indexOf($scope.country)});  
		});
	  }
	}
  };
});