const express = require("express");
const router = express.Router();
const Role = require("../models/role");

// get role
router.get("/", async (req, res) => {

  try {
    const roles = await Role.find({});

    if (!roles) return res.status(500).send("Failed to retrieve roles");
    return res.status(200).send(roles);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
