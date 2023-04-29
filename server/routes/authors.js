const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

// All authors
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.json({ authors, searchOptions: req.query });
  } catch (error) {
    res.json(error);
  }
});

// create author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    const authors = await Author.find();
    res.status(200).json({authors});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.json({ author, books });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    const authors = await Author.find();
    res.status(200).json({ authors });
  } catch (error) {
    if (author == null) {
      res.status(404).json({
        error,
        msg: "author not found",
      });
    } else {
      res.status(500).json({ error, msg: "error updating author" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    await author.deleteOne();
    const authors = await Author.find();
    res.status(200).json({ authors, msg: "author removed" });
  } catch (error) {
    if (author == null) {
      res.status(404).json({
        error,
        msg: "author not found",
      });
    } else {
      res.status(500).json({ error, msg: "error deleting author" });
    }
  }
});

module.exports = router;
