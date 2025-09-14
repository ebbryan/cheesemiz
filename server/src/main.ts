require("dotenv").config({ path: [".env.local", ".env"] });
import express from "express";
import cors from "cors";
import CustomMiddleware from "./middleware";
import DBInit from "./config/db-init";
import userRoutes from "./routes/user-auth.route";
import routes from "@routes/index";

const appInstance = express();

appInstance.use(cors());
appInstance.use(express.json());

appInstance.use("/api/v1", routes);

CustomMiddleware(appInstance);
DBInit(appInstance);
