const express = require('express');
const router=express.Router()
const login_api=require('../control/index');
router.post('/login',login_api.LoginApi)
module.exports=router