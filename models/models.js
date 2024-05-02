const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "Создан" },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  weight: { type: DataTypes.DATEONLY, allowNull: false },
  size: { type: DataTypes.STRING, allowNull: false },
  city1: { type: DataTypes.STRING, allowNull: false },
  city1: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  code: { type: DataTypes.INTEGER, unique: true, allowNull: false },
});

User.hasMany(Order, { as: "order" });
Order.belongsTso(User);

module.exports = {
  User,
  Order,
};
