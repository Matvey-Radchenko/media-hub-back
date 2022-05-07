const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Product, { foreignKey: 'userId' });
      // this.hasMany(models.Tags, { foreignKey: 'userId' });
      this.belongsToMany(models.User, {
        foreignKey: 'userId',
        // otherKey: 'friendId',
        as: 'user', //user
        through: 'models.Friends',
      });
      this.belongsToMany(models.User, {
        foreignKey: 'friendId',
        // otherKey: 'userId',
        as: 'friends',
        through: 'models.Friends',
      });
      // this.hasMany(models.Friends, { foreignKey: 'userId' });
      // this.hasMany(models.Friends, { foreignKey: 'friendId' });

    // User.belongsToMany(models.User, {
    //   foreignKey: 'userId',
    //   as: 'followers',
    //   through: models.UserFollowers
    // });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
