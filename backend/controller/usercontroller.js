const userModel = require("../modules/userModel");

const getuserdata = async (req, res) => {
  try {
    const userId = req.user.id;
   

    const user = await userModel.findById(userId).select("-password");
    
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    res.json({
      success: true,
      message: "user details received",
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVefified,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = getuserdata;
