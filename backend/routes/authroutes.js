const exprees = require('express');
const { register, login, logout, sendVerifyOtp, verifyEmail } = require('../controller/authController');

const authroutes = exprees.Router();

authroutes.post("/register",register)
authroutes.post("/login",login)
authroutes.post("/logout",logout)
authroutes.post("/sendotp",sendVerifyOtp)
authroutes.post('/verifyemail',verifyEmail)

module.exports = authroutes