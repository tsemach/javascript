'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    user: DataTypes.STRING,
    task: DataTypes.STRING,
    task_md5: DataTypes.UUID,
    event: DataTypes.STRING,
    event_md5: DataTypes.UUID
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};