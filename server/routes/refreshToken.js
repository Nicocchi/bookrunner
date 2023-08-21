const express = require("express");
const router = express.Router();
const { Hash, GenerateAccessToken } = require("../utils/index");
const User = require("../models/user");
const Role = require("../models/role");

// create user
router.get("/", async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const user = await User.findOne(
      {
        refreshToken,
      },
      { password: 0 }
    );

    if (!user) return res.sendStatus(403);

    // Evaluate JWT
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.id !== decoded.id) return res.sendStatus(403);
        const roles = Object.values(user.roles);
        const accessToken = GenerateAccessToken({
          UserInfo: {
            id: user.id,
            username: user.username,
            roles,
          },
        });

        return res.status(200).send({ accessToken });
      }
    );

    return;
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
