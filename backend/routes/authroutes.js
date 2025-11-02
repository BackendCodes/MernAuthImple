const exprees = require('express');
const { register, login, logout, sendVerifyOtp, verifyEmail, isauthenticated, sendresetotp, resetpassword } = require('../controller/authController');
const userAuthMi = require('../middleware/userAuthMiddleware');

const authroutes = exprees.Router();

authroutes.post("/register",register)
authroutes.post("/login",login)
authroutes.post("/logout",logout)
authroutes.post("/sendotp",userAuthMi,sendVerifyOtp)
authroutes.post('/verifyemail',userAuthMi,verifyEmail)
authroutes.post("/is-auth",userAuthMi,isauthenticated)
authroutes.post("/sendresetotp",sendresetotp)
authroutes.post("/resetpassword",resetpassword)

module.exports = authroutes