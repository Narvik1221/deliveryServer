const ApiError = require("../error/ApiError");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const {
  Order,
  Cities,
  Feedback,
} = require("../models/models");
class OrderController {
  async createFeedback(req, res, next) {
    try {
      let { orderId, email, raiting, name } = req.body;
      const feed = await Feedback.create({
        orderId,
        email,
        raiting,
        name,
      });
      return res.json(feed);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getFeedbacks(req, res, next) {
    try {
      let feeds = await Feedback.findAll({});

      return res.json(feeds);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async createOrder(req, res, next) {
    try {
      let {
        userId,
        status,
        active,
        weight,
        size,
        city1,
        city2,
        price,
        date1,
        date2,email
      } = req.body;
      const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
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
        date1,
        date2,email
      });
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async changeOrder(req, res, next) {
    try {
      let { id, status, active,feedback } = req.body;
      const order = await Order.findOne({ where: { id } });
      order.update({
        status,
        active,
        feedback
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

  async getAllOrders(req, res, next) {
    try {
      let { active } = req.params;
      if (active == "true" || active == "false") {
        let orders = await Order.findAll({
          where: { active: active },
          order: [["updatedAt", "DESC"]],
        });
        return res.json(orders);
      }
      let orders = await Order.findAll(); //{ order: [["updatedAt", "DESC"]] }
      return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const card = await Order.destroy({
        where: {
          id,
        },
      });
      return res.json(card);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OrderController();
