const express = require('express');
const userAuthMi = require('../middleware/userAuthMiddleware');
const getuserdata = require('../controller/usercontroller');
const userRouter = express.Router();


userRouter.get('/data',userAuthMi,getuserdata)


module.exports = userRouter