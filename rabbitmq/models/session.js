'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    user: DataTypes.STRING,
    task: DataTypes.STRING(1024),
    task_md5: DataTypes.UUID,
	task_queue: DataTypes.STRING,
    event: DataTypes.STRING(1024),
    event_md5: DataTypes.UUID,
	event_queue: DataTypes.STRING
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};
