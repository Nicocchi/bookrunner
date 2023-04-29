const express = require("express");
const router = express.Router();
const BookType = require("../models/bookType");

// All types
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const bookTypes = await BookType.find(searchOptions);
    res.json({ bookTypes, searchOptions: req.query });
  } catch (error) {
    res.json(error);
  }
});

// create type
router.post("/", async (req, res) => {
  const bookType = new BookType({
    name: req.body.name.toLowerCase(),
  });

  try {
    const newType = await bookType.save();
    const bookTypes = await BookType.find();
    res.status(200).json({bookTypes});
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookType = await BookType.findById(req.params.id);
    res.json({ bookType });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const bookType = await BookType.findById(req.params.id);
  } catch (error) {
    res.json(error);
  }
});

// edit
router.put("/:id", async (req, res) => {
  let bookType;
  try {
    bookType = await BookType.findById(req.params.id);
    bookType.name = req.body.name;
    await bookType.save();
    const bookTypes = await BookType.find();
    res.status(200).json({ bookTypes });
  } catch (error) {
    if (bookType == null) {
      res.status(404).json({
        error,
        msg: "book type not found",
      });
    } else {
      res.status(500).json({ error, msg: "error updating book type" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let bookType;
  try {
    bookType = await BookType.findById(req.params.id);
    await bookType.deleteOne();
    const bookTypes = await BookType.find();
    res.status(200).json({ bookTypes, msg: "book type removed" });
  } catch (error) {
    if (bookType == null) {
      res.status(404).json({
        error,
        msg: "bookType not found",
      });
    } else {
      res.status(500).json({ error, msg: "error deleting bookType" });
    }
  }
});

module.exports = router;
