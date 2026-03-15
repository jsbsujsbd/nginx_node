const express = require('express');
const router=express.Router()
const login_api=require('../control/index');
router.post('/login',login_api.LoginApi)
router.post('/addAccount',login_api.addAccount)
module.exports=router