/**
 * admin page, member information register
 */
//连接远程服务器
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/jwtSecretKey');
//member info register
exports.registerControllers = (req, res) =>{
    //定义member info的参数
    let {firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation} = req.body;
    
    //member name, phone number, username, password 判断是否为空的校验
    if (!firstName || !lastName || !phoneNumber || !username || !password) {
        return res.send({code: 1, message:'Member name, phone number, username and password could not be empty.'});
    };

    //登录用的username could no be repeated
    const usernameSelectSql = 'SELECT * FROM member WHERE username =?';
    db.query(usernameSelectSql, username, (err, results) =>{
        if (err) {
            return res.send({code: 1, message:err.message})
        };

        //如果打印的数组值为0，空值，则return一个error message
        if (results.length > 0) {
            return res.send({code: 1, message:' The member user name has already exists.'});
        };

        //member info insert into database
    const memberInsertSql = 'INSERT INTO member (firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
        memberInsertSql,
        [firstName, lastName, phoneNumber, username, password, address, emailAddress, birthday, occupation],
        (err, results) =>{
            if (err) {
                return res.send({code: 1, message: err.message});
            };
            res.send({code: 0, message:'Member Information Register Success!'});
        }
    )
    });
};

//admin login
exports.loginControllers = (req, res) =>{
    let{ admin, password } = req.body;
    //sql语句 查询admin字段
    const adminSelectSql = 'SELECT admin FROM admin WHERE admin =?';
    //sql语句 查询password字段
    const passwordSelectSql = 'SELECT password FROM admin WHERE password =?';

    //先查询admin，再查询password
    db.query(adminSelectSql, admin, (err, results) =>{
        //错误日志返回
        if (err) {
            return res.send({code: 1, message:err.message});
        };

        //验证admin字段是否和数据库一致，使用 === 绝对等
        if (results.length === 0) {
            return res.send({code: 1, message:'Administer account name is not correct!'});
        };

        //验证password字段是否和数据库一致，使用 === 绝对等
        db.query(passwordSelectSql, password, (err, results) =>{
            if (err) {
                return res.send({code: 1, message:err.message})
            };
    
            if (results.length === 0) {
                return res.send({code: 1, message:'Password is not correct!'});
            };
            
            //设置admin网站过期时间，目前为24h
            const admin = {admin:'admin'};
            const token = jwt.sign(admin, jwtSecretKey,{expiresIn: '24h'});
            
            //登录成功
            res.send({code: 0, message: 'Login Success', token: 'Bearer ' + token});
        });
    })
};

//admin page: search member info
exports.adminInfoControllers = (req, res) =>{
    //获取token
    const token = req.headers.authorization;
    const adminInfo = jwt.verify(token.split('Bearer ')[1], jwtSecretKey);
    res.send({code: 0, data: {admin: adminInfo.admin}});
};

//admin page: upload photo api
exports.uploadImages = (req, res) =>{
    res.send('upload success')
};

//admin page: display photo api
exports.displayImage = (req, res) =>{
    res.send('display success')
};