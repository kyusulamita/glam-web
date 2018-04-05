app.controller('LoginCtrl', function($scope, AuthService){
  $scope.login = () => {
    AuthService.login($scope.credentials);
  }
});
