const connection = require('../db/connection');

exports.getUsers = () => connection
  .select('*')
  .from('users');

exports.insertUser = user => connection
  .insert(user).into('users').returning('*');

exports.getUserByUsername = conditions => connection
  .select('users.*')
  .from('users')
  .where(conditions);
