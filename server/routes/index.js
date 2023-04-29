const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const BookType = require("../models/bookType");
const Author = require("../models/author");
const Artist = require("../models/artist");

router.get("/", async (req, res) => {
  let books = [];
  try {
    books = await Book.find().sort({ createdAt: "desc" }).limit(10).exec();
  } catch (error) {
    books = [];
  }

  res.send({ books });
});

router.get("/all", async (req, res) => {
  let authors = [];
  let booktypes = [];
  let artists = [];

  try {
    booktypes = await BookType.find();
    authors = await Author.find();
    artists = await Artist.find();
  } catch (error) {
    authors = [];
    booktypes = [];
    artists = [];
  }

  res.status(200).json({ authors, booktypes, artists });
});

module.exports = router;
