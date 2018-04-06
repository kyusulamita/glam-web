app.controller('ServiceSummaryCtrl', function($scope, ServiceService){
  ServiceService.findAll()
  .then(services => {
    $scope.count = services.length;
  });
});
