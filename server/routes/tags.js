const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");
const Book = require("../models/book");

// All tags
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const tags = await Artist.find(searchOptions);
    res.json({ tags, searchOptions: req.query });
  } catch (error) {
    res.json(error);
  }
});

// create artist
router.post("/", async (req, res) => {
  const tag = new Tag({
    name: req.body.name,
  });

  try {
    const newTag = await tag.save();
    const tags = await Tag.find();
    res.status(200).json({ tags });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    const books = await Book.find({ tag: tag.id }).limit(6).exec();
    res.json({ tag, books });
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", async (req, res) => {
  let tag;
  try {
    tag = await Tag.findById(req.params.id);
    tag.name = req.body.name;
    await tag.save();
    const tags = await Tag.find();
    res.status(200).json({ tags });
  } catch (error) {
    if (tag == null) {
      res.status(404).json({
        error,
        msg: "Tag not found",
      });
    } else {
      res.status(500).json({ error, msg: "error updating tag" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let tag;
  try {
    tag = await Tag.findById(req.params.id);
    await tag.deleteOne();
    const tags = await Tag.find();
    res.status(200).json({ tags, msg: "Tag removed" });
  } catch (error) {
    if (tag == null) {
      res.status(404).json({
        error,
        msg: "Tag not found",
      });
    } else {
      res.status(500).json({ error, msg: "error deleting tag" });
    }
  }
});

module.exports = router;
