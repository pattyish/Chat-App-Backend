const jwt = require("jwt-then");
const { catchErrors } = require("../handlers/errorHandlers");
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, process.env.SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Forbidden ",
    });
  }
};
