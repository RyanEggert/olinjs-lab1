var myApp = angular.module("myApp", ['ngRoute']);


myApp.config(function($routeProvider) {
     $routeProvider

         // route for the home page
         .when('/', {
             templateUrl : 'views/home.html',
             controller  : 'mainController'
         })

         // route for the about page
         .when('/newWiki', {
             templateUrl : 'views/newWiki.html',
             controller  : 'newWikiController'
         })

         .when('/playerWiki', {
             templateUrl : 'views/wiki.html',
             controller  : 'pageController'
         })
 });

 // create the controller and inject Angular's $scope
myApp.controller('mainController', function($scope, $http, $location) {
     // create a message to display in our view
    // $scope.playerName = "Michael Jordan";
    $scope.search = function(){
        alert("search");
        var found = false;
        $scope.articles.forEach(function(currentValue, index, array){
            if($scope.playerName == currentValue.title){
                console.log($scope.playerName + " exists");
                alert("worked");
                found = true;

                $location.path("/playerWiki");

            }
        })
        if(!found){
            alert("player wasnt found");
        }
    };

    $scope.message = 'Home page';
     // place holder for mongo data
    $scope.getWiki = function(){ 
        // alert("yo")

        $http.get("/api/wikis")
        .success(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
            $scope.articles = data;

          }).
          error(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);

          });
    }
    $scope.getWiki()        

});

myApp.controller('newWikiController', function($scope, $http, $location) {
    $scope.message = 'Creating new wiki.';
     // $scope.playerTitle
    $scope.sumbitNew = function(){ 
        // alert("yo");
        var formData = {
         	title : $scope.playerTitle,
        	content: $scope.playerContent
        };

        $http.post("/api/createWiki", formData)
        .success(function(data, status, headers, config) {
        	console.log("data", data);
        	console.log("status", status);
            $location.path("/playerWiki");

          }).
          error(function(data, status, headers, config) {
          	console.log("data", data);
        	console.log("status", status);

          });
    }

});

myApp.controller('pageController', function($scope, $http) {
    $scope.message = 'Player page';
    console.log("inside page",$scope.articles);

    

    $http.post("/api/getPlayer", {title: $scope.playerName})
    .success(function(data, status, headers, config) {
        console.log("data", data);
        console.log("status", status);

        $scope.wikiTitle = data.title;
        $scope.wikiContent = data.content;

    }).
      error(function(data, status, headers, config) {
        console.log("data", data);
        console.log("status", status);

    });

    

});