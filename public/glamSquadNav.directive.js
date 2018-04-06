app.directive('glamSquadNav', function(){
  return {
    templateUrl: '/public/templates/glamSquadNav.directive.html',
    controller: function($scope, AuthService, AppointmentService){
      $scope.isLoggedIn = () => !!AuthService.user.id;
      $scope.getEmail = () => AuthService.user.email;
      $scope.logout = () => AuthService.logout();
      $scope.appointmentCount = () => AppointmentService.appointments.length;
    }
  };
})
