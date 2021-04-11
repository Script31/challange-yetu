const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const authConfig = require("../../config/authSecrect");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.ttl);

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};
