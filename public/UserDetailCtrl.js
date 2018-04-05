app.controller('UserDetailCtrl', function($scope, $stateParams, UserService){
  UserService.fetchUserAppointments($stateParams.id)
  .then(appointments => {
    $scope.appointments = appointments;
    $scope.user = appointments[0] && appointments[0].user;
    $scope.show = !!appointments.length;
  })
})
