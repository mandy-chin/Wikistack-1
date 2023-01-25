const express = require("express");
const router = express.Router();
const {Page} = require("../models/index");
const addPage = require("../views/addPage");
const wikipage = require("../views/wikipage");

router.get('/', (req, res, next) => {
    res.send("hello word")
})

router.post('/', async (req, res, next) => {
    // res.json(req.body) 
    // {"author":"dasd","email":"dasd","title":"dasd","content":"dasd","status":"dad"}
    try {
        const page = await Page.create({
            title: req.body.title,
            content: req.body.content
        });
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {next(error)}
});

router.get('/add', (req, res, next) => {
    res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        res.send(wikipage(page));
    } catch (error) {
        next(error)
    }
  });

module.exports = router;