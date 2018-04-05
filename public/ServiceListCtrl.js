
app.controller('ServiceListCtrl', function($scope, ServiceService){
  ServiceService.findAll()
  .then(services => {
    $scope.services = services;
  });
});
