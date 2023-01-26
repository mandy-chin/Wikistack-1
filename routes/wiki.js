const express = require("express");
const router = express.Router();
const { Page, User } = require("../models/index");
const addPage = require("../views/addPage");
const wikipage = require("../views/wikipage");
const mainPage = require("../views/main");

router.get("/", async (req, res, next) => {
  try {
    const page = await Page.findAll();
    res.send(mainPage(page));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // res.json(req.body)
  // {"author":"dasd","email":"dasd","title":"dasd","content":"dasd","status":"dad"}
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });

    const [user, wasCreated] = await User.findOrCreate({
        where: {
            name: req.body.author,
            email: req.body.email
        }
    });
    await page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
    try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    const author = await page.getAuthor();
    console.log(page)
    res.send(wikipage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
