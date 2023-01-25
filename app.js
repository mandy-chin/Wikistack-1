const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

app.get("/", (req, res) => {
    res.redirect("/wiki");
});

const init = async () => {
  await db.sync();
  await Page.sync();
  await User.sync();

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
