// require("dotenv").config();
// const jwt = require("jsonwebtoken");
const dbops = require('../usermodels/modelindex')
const tokenVerification = async (req, res, next) => {
  try {
    const tkn = req.headers.id;
    if (!tkn) {
      res.send(" auth token required");
    } else if (tkn) {

      let decode = await dbops.tokendata.findOne({ where: { token: tkn } })
      if (decode) {
        req.user = decode;
        // let decode = jwt.verify(tkn, process.env.key);
      }
      else { res.send("token expired") }
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: error,
    });
  }
};
module.exports = tokenVerification;
