const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const BookType = require("../models/bookType");
const Author = require("../models/author");
const Artist = require("../models/artist");
const Tag = require("../models/tag");
const Genre = require("../models/genre");

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
  let tags = [];
  let genres = [];

  let status = 200;
  let err = null;

  try {
    booktypes = await BookType.find().sort({name: 1}).exec();
    authors = await Author.find().sort({name: 1}).exec();
    artists = await Artist.find().sort({name: 1}).exec();
    tags = await Tag.find().sort({name: 1}).exec();
    genres = await Genre.find().sort({name: 1}).exec();

  } catch (error) {
    err = error;
    status = 500;
    authors = [];
    booktypes = [];
    artists = [];
    tags = [];
    genres = [];
  }

  res.status(status).json({ error: err, authors, booktypes, artists, tags, genres });
});

module.exports = router;
