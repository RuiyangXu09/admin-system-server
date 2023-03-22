const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const memberController = require('../controllers/memberController');
const { findMemberInfoCheck, updateMemberInfoCheck, deleteMemberInfoCheck} = require('../utils/memberInfoCheck');
//Member 查询接口
router.get('/find',expressJoi(findMemberInfoCheck),memberController.listInfo);
//Member info 修改接口
router.get('/update',expressJoi(updateMemberInfoCheck),memberController.updateMemberInfoByID);
//Member info 删除接口
router.get('/delete',expressJoi(deleteMemberInfoCheck),memberController.deleteMemberInfoByID);

module.exports  = router;