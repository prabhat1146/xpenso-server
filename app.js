const express = require("express");
const app = express();
const cors=require("cors");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const modesRouter=require("./src/routes/modesRouter");
const categoriesRouter=require("./src/routes/categoriesRouter");
const transactionsRouter=require("./src/routes/transactionsRouter");
const ratingsRouter=require("./src/routes/ratingRouter");
const usersRouter=require("./src/routes/usersRouter");
const authRouter=require("./src/routes/authRouter");
const emailRouter=require("./src/routes/emailRouter");
const mobileRouter=require("./src/routes/mobileRouter");
const verifyToken = require("./src/middlewares/auth/verifyToken");
//default middleware
app.use(cors({
    origin:process.env.CLIENT_ORIGIN
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json())


// default route
app.get("/",(req,res)=>{
res.send("Server is running.")
})
// routes
// for authentication only
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/email",emailRouter);
app.use("/api/v1/mobile",mobileRouter);

app.use("/api/v1/user",verifyToken);
app.use("/api/v1/admin",modesRouter);
app.use("/api/v1/user",usersRouter);
app.use("/api/v1/user/modes",modesRouter);
app.use("/api/v1/user/categories",categoriesRouter);
app.use("/api/v1/user/transactions",transactionsRouter);
app.use("/api/v1/user/ratings",ratingsRouter);

// erro middle-ware
app.use(errorMiddleware)

module.exports = { app };
