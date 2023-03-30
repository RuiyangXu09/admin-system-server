// //引入multer
// const multer = require('multer');
// let uploads =multer({
//     dest:'../image/' //你存放的文件夹
// })



//文件上传的路径配置
// const Storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         //保存上传的文件路径
//         cb(null, '../uploads');
//     },
//     filename: (req, file,cb) =>{
//         //保存上传文件的名称
//         cb(null, file.fieldname+ '-' + Date.now());
//     }
// });

// //将配置匹配给multer对象
// // const upload = multer({
// //     storage: Storage
// // });
// //导出配置
// module.exports = uploads;