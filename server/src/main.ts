require("dotenv").config({ path: [".env.local", ".env"] });
import express from "express";
import cors from "cors";
import CustomMiddleware from "./middleware";
import DBInit from "./config/db-init";

const appInstance = express();

appInstance.use(cors());
appInstance.use(express.json());

appInstance.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

CustomMiddleware(appInstance);
DBInit(appInstance);
