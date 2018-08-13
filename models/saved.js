// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines

// Creating our User model
module.exports = function(sequelize, DataTypes)
{
  var Save = sequelize.define("Save",
  {
    recUrl:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    recId:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    recImg:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    recIngList:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    recTitle:{
      type: DataTypes.STRING,
      allowNull: false,
    }

  });

  //post association a book should belong to an author (for this instance)
  Save.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Save.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }
    });
  };
  return Save;

};
