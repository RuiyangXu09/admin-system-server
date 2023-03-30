const express = require('express');
const app = express()
const adminController = require('../controllers/adminController');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
//引入member验证和admin验证
const { memberCheck } = require('../utils/memberCheck');
const { adminCheck } = require('../utils/adminChecker');
//引入处理文件上传的模块
// const upload =require('../config/upload')



//引入multer，将文件保存到指定的目录中，准备读取该文件
const multer = require('multer');
const upload = multer({
    //store image folder
    dest:'image/'
})

//admin page: member information register api
router.post('/register',expressJoi(memberCheck),adminController.registerControllers);
//admin page: admin login api
router.post('/login',expressJoi(adminCheck),adminController.loginControllers);
//admin page: admin search api
router.get('/adminInfo',adminController.adminInfoControllers);
//admin page: admin upload single image
router.post('/upload', upload.single('image'), adminController.uploadImagesControllers);


//app.use(express.json());
// const fs = require('fs')
// router.post('/upload', upload.single('file'), (req,res)=>{
//     let data = {
//         code:'0',
//         mes:'请求失败'
//     }
//     console.log('上传传入的图片参数----',req.file.path) //拿到传入的图片路径
//     fs.readFile(req.file.path,(err,datas)=>{    //读取
//         if(err){    //失败
//             res.json(data)
//         }else{  //写入文件
//             // 拼接文件的名称
//             let times = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 1999)  //根据时间来实现不同名称
//             let extname = req.file.mimetype.split('/')[1]   //文件的扩展名
//             let names = times + '.' + extname
//             console.log('names--------',names)
//             fs.writeFile('../image/' + names,datas,(errs)=>{
//                 if(errs){
//                     console.log(1)
//                     data.mes = '上传失败'
//                     res.json(data)
//                 }else{
//                     console.log(2)
//                     data.code = 1
//                     data.mes = '上传成功'
//                     data.data = 'image/' + names 
//                     res.json(data)
//                 }
//             }) 
//         }
//     })
// });




//admin page: admin display
router.get('/display', adminController.displayImageControllers);

module.exports  = router;