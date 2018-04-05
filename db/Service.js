const conn = require('./conn');
const { Sequelize } = conn;

const Service = conn.define('service', {
  name: Sequelize.STRING
}, {
  defaultScope: {
    attributes: ['name', 'id'],
  }
});

module.exports = Service;
