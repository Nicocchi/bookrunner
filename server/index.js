if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const DatabaseInit = require("./orm");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");
const bookTypesRouter = require("./routes/bookTypes");
const artistRouter = require("./routes/artists");
const tagRouter = require("./routes/tags");
const genreRouter = require("./routes/genres");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

init();

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/book-types", bookTypesRouter);
app.use("/artists", artistRouter);
app.use("/tags", tagRouter);
app.use("/genres", genreRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(process.env.PORT || 5000);

async function init() {
  await DatabaseInit();
}