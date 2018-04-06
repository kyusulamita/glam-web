app.service('UserService', function($http){
  const fetchUserAppointments = (id) => {
    return $http.get(`/api/users/${id}/appointments`)
    .then(res => res.data);
  }
  return { fetchUserAppointments };
});
