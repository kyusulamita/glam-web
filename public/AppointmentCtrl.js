app.controller('AppointmentCtrl', function($scope, AuthService, AppointmentService){
  AuthService.exchangeTokenForUser();
  const _user = AuthService.user;
  $scope.user = _user;
  if (_user.id) AppointmentService.loadAppointments(_user);
  $scope.appointments = AppointmentService.appointments;
})
