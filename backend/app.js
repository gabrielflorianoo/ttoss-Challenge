const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
// Carrega variáveis de ambiente
dotenv.config();

const usersRouter = require("./routes/users");
const videosRouter = require("./routes/videos");

const app = express();

app.set("views", path.join(__dirname, "views")); // Corrigido para CommonJS
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use("/users", usersRouter);
app.use("/videos", videosRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

app.listen(8000, () => console.log("🚀 Server running on port 8000"));

module.exports = app;
