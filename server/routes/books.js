const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Book = require("../models/book");
const Author = require("../models/author");
const crypto = require("crypto");
const mime = require("mime-types");
require("../models/bookType");
const imagePath = path.join("public", Book.coverImageBasePath);
const bookPath = path.join("public", Book.bookFileBasePath);
const bookFileMimeTypes = ["application/pdf", "application/epub"];
const imageMimeTypes = [
  "image/jpeg",
  "image/png",
  "images/gif",
  "application/pdf",
  "application/epub+zip",
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("MULTER:", file);
    if (file.fieldname === "bookcover") {
      // uploading book
      cb(null, imagePath);
    } else {
      // else uploading image
      cb(null, bookPath);
    }
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString("hex") + "." + mime.extension(file.mimetype));
    });
  },
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

const upload = multer({ storage });

// All books
router.get("/", async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }
  try {
    const books = await query
      .populate("author")
      .populate("bookType")
      .populate("artist")
      .populate("tags")
      .exec();
    res.json({ books, searchOptions: req.query });
  } catch (error) {
    res.json(error);
  }
});

router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.json({ authors, books });
  } catch (error) {
    res.json(error);
  }
});

// get by id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author")
      .populate("bookType")
      .populate("artist")
      .populate("tags")
      .exec();
    res.status(200).json({ book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// edit
const cpUpload = upload.fields([
  { name: "bookcover", maxCount: 9999 },
  { name: "bookfile", maxCount: 9999 },
]);
router.put("/:id", cpUpload, async (req, res) => {
  let book;

  try {
    book = await Book.findById(req.params.id);
    const coverName = req.files.bookcover
      ? req.files?.bookcover[0]?.filename
      : book.coverImage;
    const bookFileName = req.files.bookfile
      ? req.files?.bookfile[0]?.filename
      : book.file;
    const mimetype = req.files.bookfile
      ? req.files?.bookfile[0]?.mimetype
      : book.mimetype;
    const artist = req.body.artist ? req.body.artist : book.artist;
    const tags = req.body.tags ? req.body.tags : [];

    book.title = req.body.title;
    book.author = req.body.author;
    book.artist = artist;
    book.publishDate = new Date(req.body.publishDate);
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    book.bookType = req.body.bookType;
    book.coverImage = coverName;
    book.file = bookFileName;
    book.public = req.body.public;
    book.mimetype = mimetype;
    book.tags = tags;

    await book.save();

    const newBook = await Book.findById(req.params.id);
    res.status(200).json({ book: newBook });
  } catch (error) {
    res.status(500).json({ error, book });
  }
});

// delete book
router.delete("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.deleteOne();
    res.json({ msg: "book removed" });
  } catch (error) {
    res.json(error);
  }
});

// create book
router.post("/", cpUpload, async (req, res) => {
  const coverName = req.files.bookcover
    ? req.files?.bookcover[0]?.filename
    : "";
  const bookFileName = req.files.bookfile
    ? req.files?.bookfile[0]?.filename
    : "";
  const mimetype = req.files.bookfile ? req.files?.bookfile[0]?.mimetype : "";
  const artist = req.body.artist ? req.body.artist : [];
  const tags = req.body.tags ? req.body.tags : [];

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    artist: artist,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
    bookType: req.body.bookType,
    coverImage: coverName,
    file: bookFileName,
    public: req.body.public,
    mimetype: mimetype,
    tags: tags,
  });

  try {
    const newBook = await book.save();
    const books = await Book.find();

    res.status(200).json({ books, savedBook: newBook });
  } catch (error) {
    // if (book.coverImage != null) {
    //   removeBookCover(book.coverImage);
    // }
    res.status(500).json({ error, book });
  }
  // console.log(req.body);
  // const fileName = req.file != null ? req.file.filename : null;

  // try {
  //   const newBook = await book.save();
  //   const books = await Book.find();
  //   res.json({ books, savedBook: newBook });
  // } catch (error) {
  //   if (book.coverImage != null) {
  //     removeBookCover(book.coverImage);
  //   }
  //   res.json(error);
  // }
});

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.err(err);
  });
}

module.exports = router;
