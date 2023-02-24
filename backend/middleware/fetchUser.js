/* eslint-disable quotes */
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Manji_The_Mountain_Man-21";

const fetchuser = (req, res, next) => {
  // Get User details from header and add it to the req object
  const token = req.header("auth-token");
  //   If token isn't present
  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  //   If token is present
  try {
    //   If token is present & valid
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log(data.user);
    next();
  } catch (err) {
    //   If token is present & invalid
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
