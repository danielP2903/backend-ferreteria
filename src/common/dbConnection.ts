import dotenv from "dotenv";
import setupModels from "./schemas";
import { Sequelize } from 'sequelize';

dotenv.config();

const dbConnection:Sequelize = new Sequelize(process.env.DB_NAME as string,process.env.DB_USER as string,process.env.DB_PASS as string, {
    host : "localhost",
    dialect: "mysql",
    port: 3306,
    define: {
      freezeTableName: true,
      timestamps: false,
    }
  });

  setupModels(dbConnection);
  dbConnection.sync();
  
  
export default dbConnection