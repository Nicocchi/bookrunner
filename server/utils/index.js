const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and return hash
function Hash(pwd) {
  const ENV_SALT = process.env.ENCRYPT_SALT_LEVEL;
  const saltLevel = parseInt(ENV_SALT);
  const hash = bcrypt.hashSync(pwd, saltLevel);
  return hash;
}

// Create and return JWT Access Token
function GenerateAccessToken(data) {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`;
  const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
  return accessToken;
}

// Create and return JWT Refresh Token
function GenerateRefreshToken(data) {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  const expiresIn = `${process.env.REFRESH_TOKEN_EXPIRES_IN}d`;
  const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
  return refreshToken;
}

// Compare and return if string matches or not
function CompareSync(pwd, pwdToCompare) {
  const SECRET = process.env.ENCRYPT_SECRET;
  const isMatch = bcrypt.compareSync(pwd, pwdToCompare);
  return isMatch;
}

function ValidateToken(token) {
  try {
    const TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const tokenToValidate = token.replace("Bearer ", "");
    const user = jwt.verify(tokenToValidate, TOKEN_SECRET);
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }

  return null;
}

module.exports = {
  Hash,
  GenerateAccessToken,
  GenerateRefreshToken,
  CompareSync,
  ValidateToken,
};
