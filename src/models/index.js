const adminModel = require('./user/adminModel');
const cidadaoModel = require('./user/cidadaoModel');
const pecModel = require('./pec/pecModel');
const authModel = require('./auth/authModel');
const DB = require('./database');

module.exports = {
  adminModel,
  cidadaoModel,
  pecModel,
  authModel,
  DB
};
