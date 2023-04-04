const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const memberController = require('../controllers/memberController');
const { findMemberInfoCheck, updateMemberInfoCheck, deleteMemberInfoCheck } = require('../utils/memberInfoCheck');
//Member 查询api
router.get('/find',expressJoi(findMemberInfoCheck),memberController.listInfo);
//Member info 修改api
router.get('/update',expressJoi(updateMemberInfoCheck),memberController.updateMemberInfoByID);
//Member info 删除api
router.get('/delete',expressJoi(deleteMemberInfoCheck),memberController.deleteMemberInfoByID);
//Admin info 查询api
router.get('/search', memberController.listAdminInfo);
//Admin info 修改api
router.get('/edit', memberController.editAdminInfo);
module.exports  = router;