app.service('AppointmentService', function ($http) {
  const appointments = [];
  const pastAppointments = [];
  const futureAppointments = [];
  const loadAppointments = (user) => {
    return $http.get(`/api/users/${user.id}/appointments`)
            .then(res => res.data)
            .then(_appointments => {
              Object.assign(appointments, _appointments)
            })
            .catch(err => console.log(err));
  }

  const loadPastAppointments = (user) => {
    return $http.get(`/api/users/${user.id}/appointments?type=past`)
    .then(res => res.data)
    .then(_appointments => {
      Object.assign(pastAppointments, _appointments);
    })
    .catch(err => console.log(err));
  }

  const loadFutureAppointments = (user) => {
    return $http.get(`/api/users/${user.id}/appointments?type=future`)
    .then(res => res.data)
    .then(_appointments => {
      Object.assign(futureAppointments, _appointments);
    })
    .catch(err => console.log(err));
  }

  return {
    appointments,
    futureAppointments,
    pastAppointments,
    loadAppointments,
    loadFutureAppointments,
    loadPastAppointments
  };
})
