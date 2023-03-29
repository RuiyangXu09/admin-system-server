const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const multer = require('multer');
//引入存储位置
const diskStorage = require('../app')
const upload = multer({diskStorage})
//引入member验证和admin验证
const { memberCheck } = require('../utils/memberCheck');
const { adminCheck } = require('../utils/adminChecker');

//admin page: member information register api
router.post('/register',expressJoi(memberCheck),adminController.registerControllers);
//admin page: admin login api
router.post('/login',expressJoi(adminCheck),adminController.loginControllers);
//admin page: admin search api
router.get('/adminInfo',adminController.adminInfoControllers);
//admin page: admin upload images to photo gallery
router.post('/upload', upload.single('image'), adminController.uploadImages);
//admin page: admin display
router.get('/display', adminController.displayImage);

module.exports  = router;