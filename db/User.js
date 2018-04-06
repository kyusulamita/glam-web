const JWT_SECRET = process.env.JWT_SECRET;
const conn = require('./conn');
const { Sequelize } = conn;

if(!JWT_SECRET){
  throw 'provide JWT_SECRET';
}
const jwt = require('jwt-simple');

const User = conn.define('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  defaultScope: {
    attributes: ['email', 'id'],
  },
});

User.findByToken = function(token){
  try {
    const id = jwt.decode(token, JWT_SECRET).id;
    return User.findById(id);
  }
  catch(ex){
    if(ex.message === 'Signature verification failed'){
      return Promise.reject({
        status: 401
      });
    }
    return Promise.reject({
    });
  };
}

User.authenticate = function(credentials){
  return User.findOne({
    where: {
      email: credentials.email,
      password: credentials.password
    }
  })
  .then( user => {
    if(user)
      return user;
    throw { status: 401 };
  });
};

User.findAppointments = function(id, type){
  // const now = moment();
  // const requirements = {};
  // requirements.userId =
  return User.findById(id)
    .then( user => conn.models.appointment.findByUser(user, type));
};

module.exports = User;
