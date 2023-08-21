const express = require("express");
const router = express.Router();
const User = require("../models/user");

// create user
router.post("/", async (req, res) => {
  const user = new User({
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
