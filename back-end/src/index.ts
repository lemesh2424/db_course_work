import express from "express";
import cors from 'cors';
import router from "./routes";
import { initConnetion } from "./database";

const app = express();
app.use(cors());
app.use("/api", router);

initConnetion().then(() => {
  app.listen(3300);
});
