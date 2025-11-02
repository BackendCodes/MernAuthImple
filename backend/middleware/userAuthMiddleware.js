const jwt = require("jsonwebtoken");

const userAuthMi = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "pleaes log in again",
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (data && data.id) {
      req.user = { id: data.id };
    } else {
      return res.json({
        success: false,
        message: "not authororized login again",
      });
    }
   
    next();
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = userAuthMi;
