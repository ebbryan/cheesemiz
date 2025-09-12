require("dotenv").config({ path: [".env.local", ".env"] });
import express from "express";
import cors from "cors";
import CustomMiddleware from "./middleware";
import DBInit from "./config/db-init";
import userRoutes from "./routes/users";

const appInstance = express();

appInstance.use(cors());
appInstance.use(express.json());

appInstance.use("/api/users", userRoutes);

CustomMiddleware(appInstance);
DBInit(appInstance);
