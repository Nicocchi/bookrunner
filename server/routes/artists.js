const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");
const Book = require("../models/book");

// All artists
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const artists = await Artist.find(searchOptions);
    res.json({ artists, searchOptions: req.query });
  } catch (error) {
    res.json(error);
  }
});

// create artist
router.post("/", async (req, res) => {
  const artist = new Artist({
    name: req.body.name,
  });

  try {
    const newArtist = await artist.save();
    const artists = await Artist.find();
    res.status(200).json({ artists });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    const books = await Book.find({ artist: artist.id }).limit(6).exec();
    res.json({ artist, books });
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", async (req, res) => {
  let artist;
  try {
    artist = await Artist.findById(req.params.id);
    artist.name = req.body.name;
    await artist.save();
    const artists = await Artist.find();
    res.status(200).json({ artists });
  } catch (error) {
    if (artist == null) {
      res.status(404).json({
        error,
        msg: "Artist not found",
      });
    } else {
      res.status(500).json({ error, msg: "error updating artist" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let artist;
  try {
    artist = await Artist.findById(req.params.id);
    await artist.deleteOne();
    const artists = await Artist.find();
    res.status(200).json({ artists, msg: "artist removed" });
  } catch (error) {
    if (artist == null) {
      res.status(404).json({
        error,
        msg: "artist not found",
      });
    } else {
      res.status(500).json({ error, msg: "error deleting artist" });
    }
  }
});

module.exports = router;
