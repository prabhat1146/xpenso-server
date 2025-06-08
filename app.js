const express = require("express");
const app = express();
const cors=require("cors");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const modesRouter=require("./src/routes/modesRouter");
const categoriesRouter=require("./src/routes/categoriesRouter");
const usersRouter=require("./src/routes/usersRouter");
//default middleware
app.use(cors({
    origin:process.env.CLIENT_ORIGIN
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json())

// routes

app.use("/api/v1/admin",modesRouter);
app.use("/api/v1/user",usersRouter);
app.use("/api/v1/user/modes",modesRouter);
app.use("/api/v1/user/categories",categoriesRouter);

// erro middle-ware
app.use(errorMiddleware)

module.exports = { app };
