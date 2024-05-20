'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mood: DataTypes.INTEGER,
    anxiety: DataTypes.INTEGER,
    sleep: DataTypes.FLOAT,
    physicalActivityExercise:DataTypes.STRING,
    physicalActivity: DataTypes.STRING,
    socialInteractions: DataTypes.STRING,
    stress: DataTypes.INTEGER,
    symptoms: DataTypes.STRING,
    depressionSymptoms:DataTypes.JSON,
  }, {});
  Log.associate = function(models) {
    Log.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Log;
};
