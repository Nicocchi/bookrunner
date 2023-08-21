const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  CompareSync,
  GenerateAccessToken,
  GenerateRefreshToken,
} = require("../utils");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Username or password incorrect");

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(400).send("Username or password incorrect");

    if (!CompareSync(password, user.password))
      return res.status(400).send("Username or password incorrect");

    const roles = Object.values(user.roles);

    const accessToken = await GenerateAccessToken({
      UserInfo: {
        id: user.id,
        username: user.username,
        roles,
      },
    });

    const refreshToken = await GenerateRefreshToken({
      id: user.id,
      username: user.username,
    });
    await user.updateOne({ refreshToken: refreshToken });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

module.exports = router;