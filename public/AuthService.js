app.service('AuthService', function($http, $window, $state, AppointmentService){
  const user = {};
  const storage = $window.localStorage;

  const setUser = (_user) => {
    Object.assign(user, _user);
  }
  const mae = {
    email: 'mae@glamsquad.com',
    password: 'MAE',
  }

  const tokenExchangeApptLoad = (token) => {
    return $http.get(`/api/sessions/${token}`)
      .then(res => res.data)
      .then(setUser)
      .then(() => {
        AppointmentService.loadAppointments(user);
      })
  }

  const exchangeTokenForUser = () => {
    const token = storage.getItem('token');
    if (token){
      return tokenExchangeApptLoad(token);
    }
  }

  const login = (credentials) => {
   $http.post('/api/sessions', mae)
   .then(res => res.data)
   .then(data => {
    storage.setItem('token', data.token);
    return tokenExchangeApptLoad(data.token);
   })
   .then(() => {
      $state.go('appointments');
   })
   .catch(err => console.log(err));
  }

  const logout = () => {
    storage.removeItem('token');
    delete user.id;
  }

  return { user, login, exchangeTokenForUser, logout };
}).run(function(AuthService){
  AuthService.exchangeTokenForUser();
})
