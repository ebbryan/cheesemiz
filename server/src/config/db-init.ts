import { Express } from "express";
import { sequelizeInstance } from "./sequelize";

const DBInit = (app: Express) => {
  sequelizeInstance
    .authenticate()
    .then(() => {
      // defineAssociations();
      console.log("Connected to the database and associations defined.");
      return sequelizeInstance.sync({ alter: true });
    })
    .then(() => {
      app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.SERVER_PORT}`);
      });
    })
    .catch((err: Error) => {
      console.error("Unable to connect to the database:", err);
    });
};

export default DBInit;
