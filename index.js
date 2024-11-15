require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const { User, Cities } = require("./models/models");
const PORT = process.env.PORT || 5000;
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

// Обработка ошибок, последний Middleware
app.use(errorHandler);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    let admin = await User.findOne({
      where: {
        role: "ADMIN",
      },
    });
    if (!!admin == false) {
      const hashPassword = await bcrypt.hash("ADMIN", 5);
      let admin = await User.create({
        email: "ADMIN",
        password: hashPassword,
        role: "ADMIN",
      });
    }
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
