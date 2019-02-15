const connection = require('../db/connection');

exports.getUsers = () => connection
  .select('*')
  .from('users');

exports.insertUser = user => connection
  .insert(user).into('users').returning('*');
