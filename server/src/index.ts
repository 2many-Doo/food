import express from "express";
import { configDotenv } from "dotenv";
import { connecDatabase } from "./database";
import { authRouter } from "./routers/auth.router";
import { foodcategoriesRouter } from "./routers/foodcategories.router";
import { foodRouter } from "./routers/food.router";
import { foodOrderRouter } from "./routers/foodOrder.router";
const app = express();

configDotenv();

connecDatabase();

const port = 8000;
app.use(express.json());
app.use("/auth", authRouter);
app.use("/food-category", foodcategoriesRouter);
app.use("/food", foodRouter);
app.use("/food-order", foodOrderRouter);

app.listen(port, () => console.log(`http://localhost:${port}`));
