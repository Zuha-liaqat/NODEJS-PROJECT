const JWT = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>" me se sirf token nikalna
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // user ka data (id, role) yahan save ho jata hai
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid Token"
    });
  }
};

module.exports = authmiddleware;
