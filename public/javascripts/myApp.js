var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

  $routeProvider

  // route for the home page
    .when('/', {
    templateUrl: 'views/home.html',
    controller: 'mainController'
  })

  // route for creating a new article
  .when('/newWiki', {
    templateUrl: 'views/newWiki.html',
    controller: 'newWikiController'
  })

  // route to a specific article.
  .when('/playerWiki/:id', {
    templateUrl: 'views/wiki.html',
    controller: 'pageController'
  });
});

// create the controller and inject Angular's $scope
myApp.controller('mainController', function ($scope, $http, $location) {
  // search functionality
  $scope.search = function () {
    var found = false;
    $scope.articles.forEach(function (currentValue, index, array) {
      if ($scope.playerName == currentValue.title) {
        found = true;
        $location.path("/playerWiki/" + $scope.playerName);
      }
    });
    if (!found) {
      alert("player wasnt found");
    }
  };
  // place holder for mongo data
  $scope.getWiki = function () {
    // get all articles from server
    $http.get('/api/wikis')
      .success(function (data, status, headers, config) {
        $scope.articles = data;
      }).
    error(function (data, status, headers, config) {
      console.log('data', data);
      console.log('status', status);
    });
  };
  $scope.getWiki();
});

myApp.controller('newWikiController', function ($scope, $http, $location) {
  // $scope.playerTitle
  $scope.submitNew = function () {
    // alert("yo");
    var formData = {
      title: $scope.playerTitle,
      content: $scope.playerContent
    };

    $http.post("/api/wikis/", formData)
      .success(function (data, status, headers, config) {
        console.log('data', data);
        console.log('status', status);
        $location.path('/');

      }).
    error(function (data, status, headers, config) {
      console.log("data", data);
      console.log("status", status);

    });
  };
});

myApp.controller('pageController', function ($scope, $http, $location, $routeParams) {
  $scope.edit = true;
  $scope.$routeParams = $routeParams;
  var playerName;

  if ($scope.playerName) {
    playerName = $scope.playerName;
    console.log("searching");
  } else {
    playerName = $routeParams.id;
    console.log("linking");
  }

  $http.post("/api/wikis/wiki", {
    title: playerName
  })

  .success(function (data, status, headers, config) {
    console.log("data", data);
    console.log("status", status);

    $scope.wikiTitle = data.title;
    $scope.wikiContent = data.content;
  }).
  error(function (data, status, headers, config) {
    console.log("data", data);
    console.log("status", status);
  });

  $scope.editPage = function () {
    $scope.edit = false;
    $scope.editplayerTitle = $scope.wikiTitle;
    $scope.editplayerContent = $scope.wikiContent;
  };

  $scope.submitEdits = function () {
    $http.post("/api/wikis/edit", {
        title: $scope.editplayerTitle,
        content: $scope.editplayerContent
      })
      .success(function (data, status, headers, config) {
        console.log("data", data);
        console.log("status", status);

        // $location.path("/playerWiki/");
        $scope.edit = true;
        $scope.wikiTitle = $scope.editplayerTitle;
        $scope.wikiContent = $scope.editplayerContent;

      }).
    error(function (data, status, headers, config) {
      console.log("data", data);
      console.log("status", status);
    });
  };
});
