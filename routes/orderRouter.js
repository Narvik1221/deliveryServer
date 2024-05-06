const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
router.post("/create", orderController.createOrder);
router.post("/feedback", orderController.createFeedback);
router.get("/feedback", orderController.getFeedbacks);
router.get("/cities", orderController.getCities);
router.get("/:userId/:active", orderController.getOrders);
router.get("/:active", orderController.getAllOrders);
router.put("/", orderController.changeOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
