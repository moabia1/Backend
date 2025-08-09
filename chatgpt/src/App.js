const express = require("express");
const indexRoutes = require("./routes/index.routes")
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());


app.use("/auth",authRoutes)
app.use("/", indexRoutes);


module.exports = app