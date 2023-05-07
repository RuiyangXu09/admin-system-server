const OSS = require('ali-oss');
//创建阿里云OSS对象
const ossClient = new OSS({
    region: 'oss-ap-southeast-1',
    accessKeyId: 'LTAI5tR2CSMZbgyNBhrgcKn5',
    accessKeySecret: 'iTa4d64JFXJBt5A4eGJ6OldmTeQQrl',
    bucket: 'akarana',
})

module.exports = ossClient;