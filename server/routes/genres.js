const express = require("express");
const router = express.Router();
const Genre = require("../models/genre");
const Book = require("../models/book");

/**
 * Get all genres
 * @author Nicocchi
 * @date 2023-04-29
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const genres = await Genre.find(searchOptions).sort({name: 1}).exec();
    res.json({ genres, searchOptions: req.query });
  } catch (error) {
    res.json(error);
  }
});

/**
 * Create genre
 * @author Nicocchi
 * @date 2023-04-29
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
router.post("/", async (req, res) => {
  const genre = new Genre({
    name: req.body.name,
  });

  try {
    const newGenre = await genre.save();
    const genres = await Genre.find().sort({name: 1}).exec();
    res.status(200).json({ genres });
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Get genre via ID
 * @author Nicocchi
 * @date 2023-04-29
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    const books = await Book.find({ genre: genre.id }).limit(6).exec();
    res.json({ genre, books });
  } catch (error) {
    res.json(error);
  }
});

/**
 * Update genre
 * @author Nicocchi
 * @date 2023-04-29
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
router.put("/:id", async (req, res) => {
  let tag;
  try {
    genre = await Genre.findById(req.params.id);
    genre.name = req.body.name;
    await genre.save();
    const genres = await Genre.find().sort({name: 1}).exec();
    res.status(200).json({ genres });
  } catch (error) {
    if (genre == null) {
      res.status(404).json({
        error,
        msg: "Genre not found",
      });
    } else {
      res.status(500).json({ error, msg: "error updating Genre" });
    }
  }
});

/**
 * Delete genre
 * @author Nicocchi
 * @date 2023-04-29
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
router.delete("/:id", async (req, res) => {
  let genre;
  try {
    genre = await Genre.findById(req.params.id);
    await genre.deleteOne();
    const genres = await Genre.find().sort({name: 1}).exec();
    res.status(200).json({ genres, msg: "Genre removed" });
  } catch (error) {
    if (genre == null) {
      res.status(404).json({
        error,
        msg: "Genre not found",
      });
    } else {
      res.status(500).json({ error, msg: "error deleting genre" });
    }
  }
});

module.exports = router;
