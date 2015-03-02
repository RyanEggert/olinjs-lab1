var myApp = angular.module('myApp', ['ngRoute']);


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

         .when('/playerWiki/:id', {
             templateUrl : 'views/wiki.html',
             controller  : 'pageController'
         })
 });

 // create the controller and inject Angular's $scope
myApp.controller('mainController', function($scope, $http, $location) {
     // create a message to display in our view
    // $scope.playerName = "Michael Jordan";
    $scope.search = function(){
        var found = false;
        $scope.articles.forEach(function(currentValue, index, array){
            if($scope.playerName.toLowerCase() == String(currentValue).toLowerCase()){
                console.log($scope.playerName + " exists");
                found = true;

                $location.path("/playerWiki/" +$scope.playerName);

            }
        })
        if(!found){
            alert("player wasnt found, create player's wiki?");
            $location.path("/newWiki");
            $scope.playerTitle = $scope.playerName;
        }
        $scope.playerName = null;
    };

  $scope.message = 'Home page';
  // place holder for mongo data
  $scope.getWiki = function() {
    // alert("yo")

    $http.get('/api/wikis')
      .success(function(data, status, headers, config) {
        console.log('data', data);
        console.log('status', status);
        $scope.articles = data;

      }).
    error(function(data, status, headers, config) {
      console.log('data', data);
      console.log('status', status);

    });
  };
  $scope.getWiki();
});

myApp.controller('newWikiController', function($scope, $http, $location) {
  $scope.message = 'Creating new wiki.';
  // $scope.playerTitle
  $scope.sumbitNew = function() {
    // alert("yo");
    var formData = {
      title: $scope.playerTitle,
      content: $scope.playerContent
    };
    var found1 = false;
    $scope.articles.forEach(function(currentValue, index, array){
        if($scope.playerTitle.toLowerCase() == String(currentValue).toLowerCase()){
            console.log($scope.playerName + " exists");
            alert("the player that you are trying to create already exists");
            found1 = true;

            $location.path("/playerWiki/" +$scope.playerTitle);

        }
    })
    if(!found1){
        $http.post("/api/createWiki", formData)
          .success(function(data, status, headers, config) {
            console.log('data', data);
            console.log('status', status);
            $location.path('/');

          }).
        error(function(data, status, headers, config) {
          console.log("data", data);
          console.log("status", status);

        });

    }


  }
});

myApp.controller('pageController', function($scope, $http, $location, $routeParams) {
    $scope.message = 'Player page';
    $scope.edit = true;
    console.log("inside page",$scope.articles);
    $scope.$routeParams = $routeParams;
    console.log("param id", $routeParams.id);
    var playerName;

    if($scope.playerName){
        playerName = $scope.playerName;
        console.log("searching");
    }else{
        playerName = $routeParams.id;
        console.log("linking");
    }

    $http.post("/api/getPlayer", {title: playerName})

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

  $scope.editPage = function() {
    $scope.edit = false;
    $scope.editplayerTitle = $scope.wikiTitle
    $scope.editplayerContent = $scope.wikiContent
  }

  $scope.sumbitEdits = function() {
    $http.post("/api/editWiki", {
        title: $scope.editplayerTitle,
        content: $scope.editplayerContent
      })
      .success(function(data, status, headers, config) {
        console.log("data", data);
        console.log("status", status);

        // $location.path("/playerWiki/");
        $scope.edit = true;
        $scope.wikiTitle = $scope.editplayerTitle;
        $scope.wikiContent = $scope.editplayerContent;


      }).
    error(function(data, status, headers, config) {
      console.log("data", data);
      console.log("status", status);
    });
  }
});
