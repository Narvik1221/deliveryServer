const ApiError = require("../error/ApiError");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Card, OrderCard, Order, Cities } = require("../models/models");
class OrderController {
  async createOrder(req, res, next) {
    try {
      let { userId, status, active, weight, size, city1, city2, price, code } =
        req.body;
      const order = await Order.create({
        userId,
        status,
        active,
        weight,
        size,
        city1,
        city2,
        price,
        code,
      });
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async changeOrder(req, res, next) {
    try {
      let { id, status, active, date } = req.body;
      const order = await Order.findOne({ where: { id } });
      order.update({
        status,
        active,
        date,
      });
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOrder(req, res, next) {
    try {
      let { userId, active } = req.params;
      const order = await Order.findOne({
        where: { userId, active },
        order: [["id", "DESC"]],
      });

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getOrders(req, res, next) {
    try {
      let { userId, active } = req.params;
      let orders = {};
      if (active == "true" || active == "false") {
        orders = await Order.findAll({
          where: { userId, active },
        });
      } else {
        orders = await Order.findAll({
          where: { userId },
        });
      }

      return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getCities(req, res, next) {
    try {
      let cities = await Cities.findAll({});

      return res.json(cities);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async allOrders(req, res, next) {
    try {
      let { active } = req.params;
      if (active == "true" || active == "false") {
        let orders = await Order.findAll({
          where: { active: active },
          order: [["updatedAt", "DESC"]],
        });
        return res.json(orders);
      }
      let orders = await Order.findAll({ order: [["updatedAt", "DESC"]] });
      return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OrderController();
