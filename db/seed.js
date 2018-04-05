const conn = require('./conn');
const { models } = conn;
const moment = require('moment');
const Service = models.service;
const User = models.user;
const Appointment = models.appointment;
const AppointmentService = models.appointmentService;

const xmas2020 = moment();
const xmas2017 = moment();

xmas2020.set({ month: 11, year: 2020, date: 25, hour: 11, minutes: 30, seconds: 0 });
xmas2017.set({ month: 11, year: 2017, date: 25, hour: 11, minutes: 30, seconds: 0 });

const createAppointments = ({ id }) => {
  return Promise.all([
    Appointment.create({ userId: id, time: xmas2020 }),
    Appointment.create({ userId: id, time: xmas2017 }),
  ]);
}

const addServices = ({ id }) => {
  return Promise.all([
    AppointmentService.create({ appointmentId: id, serviceId: 1 }),
    AppointmentService.create({ appointmentId: id, serviceId: 2 }),
  ]);
}

module.exports = ()=> {
    let users, services, appointments;
    return Promise.all([
      Service.create({ name: 'Hair'}),
      Service.create({ name: 'Nails'}),
      Service.create({ name: 'Makeup'}),
    ])
    .then( _services => {
      services = _services;
      const promises = ['mae', 'lucy', 'curly'].map( username => {
        return User.create({ email: `${username}@glamsquad.com`, password: username.toUpperCase()});
      });
      return Promise.all(promises);
    })
    .then( (_users)=> {
      users = _users;
      return Promise.all(users.map(createAppointments));
    })
    .then( _appointments => {
      appointments = _appointments;
      return Promise.all(_appointments.map(([app1, app2]) => Promise.all([addServices(app1), addServices(app2)])));
    })
    .then( () => {
      return {
        users,
        services,
        appointments
      };
    });
};
