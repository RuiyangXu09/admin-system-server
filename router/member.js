const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
//Member 查询api
router.get('/find',memberController.listInfo);
//Member info 修改api
router.get('/update',memberController.updateMemberInfoByID);
//Member info 删除api
router.get('/delete',memberController.deleteMemberInfoByID);
//Admin info 查询api
router.get('/search', memberController.listAdminInfo);
//Admin info 修改api
router.get('/edit', memberController.editAdminInfo);
// Rally 查询rally
router.get('/listRally', memberController.listRally);
// Rally 修改rally
router.get('/updateRally',memberController.updateRallyInfoByID);
// Rally 删除rally
router.get('/deleteRally',memberController.deleteRallyInfoByID);
//Rally 设置status close
router.get('/close', memberController.closeRallyStatusByID);
//Rally 设置status open
router.get('/open', memberController.openRallyStatusByID);
//member 查询对应membership的Email Formate 
router.get('/listFormate', memberController.listMemberFormat);
//member 查询对应membership的Email Formate 
router.get('/listAllEmailFormate', memberController.listAllEmailFormate);

module.exports  = router;