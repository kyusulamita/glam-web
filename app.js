const express = require('express');
const db = require('./db');
const { models } = db;
const { Service, User, Appointment, AppointmentService } = models;
const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET;
const path = require('path');

const app = express();

module.exports = app;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require('body-parser').json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/services', (req, res, next) => {
  Service.findAll()
    .then(services => res.send(services))
    .catch(next);
});

app.post('/api/sessions', (req, res, next)=> {
  User.authenticate(req.body)
    .then( user => res.send({ token: jwt.encode({ id: user.id }, JWT_SECRET)}))
    .catch(next);
});

app.get('/api/sessions/:token', (req, res, next)=> {
  User.findByToken(req.params.token)
    .then( user => res.send(user))
    .catch(next);
});


app.get('/api/users/:id/appointments', (req, res, next)=> {
  console.log(req.query);
  User.findAppointments(req.params.id, req.query.type)
    .then(appointments => res.send(appointments))
    .catch(next);
});

app.post('/api/users/:id/appointments', (req, res, next)=> {
  Appointment.createFromRequest(req)
    .then( appointment => res.send(appointment))
    .catch(next);
});
