
const {Sequelize}=require('sequelize')
require('dotenv').config({ path: '../server/.env' }); 
const pg = require('pg');
//локальная БД
// module.exports=new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect:'postgres',
//         host:process.env.DB_HOST,
//         port:process.env.DB_PORT
//     }
// )


module.exports = new Sequelize(process.env.DB_NEON, {
    dialectModule: pg,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
