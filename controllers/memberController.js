/**
 * member query page
 */
const db = require('../config/database');

//查询member info
exports.listInfo = (req, res) =>{
    //获取前端参数id, 根据id值顺序传递数据到前端
    let {id} = req.query;

    //查询member列表的sql,传入id值，按照id顺序排列
    // const memberSearchSql = 'SELECT * FROM member WHERE id=? ORDER BY id';
    const memberSearchSql = 'SELECT * FROM member ORDER BY id';
    //查询member总数的sql
    const totalSql = 'SELECT COUNT(*) AS TOTAL FROM member';

    //第一次调用member query，查询总列表
    db.query(memberSearchSql, [id], (err, resList) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }

        //第二次调用member query，查询列表的总数量
        db.query(totalSql, (err, resTotal) =>{
            if (err) {
                return res.send({code: 1, message: err.message});
            }
            //返回给前端数据
            res.send({code: 0, data:{list: resList, total: resTotal[0].TOTAL}})
        })
    }
    )
}

//修改member info
exports.updateMemberInfoByID = async (req, res) => {
    //获取前端需要接收的参数
    let {firstName, lastName, phoneNumber, 
        username, password, address, 
        emailAddress, birthday, occupation, 
        memberType, couples, dateJoined, 
        notes, active, emailFormate, id} = req.query;

    //将字段值与其对应的字段名存储在fields中
    const fields = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        username: username,
        password: password,
        address: address,
        emailAddress: emailAddress,
        birthday: birthday,
        occupation: occupation,
        memberType: memberType,
        couples: couples,
        dateJoined: dateJoined,
        notes: notes,
        active: active,
        emailFormate: emailFormate
    };

    // Check if the username is duplicated
    if (username) {
        //定义一个sql查询语句
        const checkUsernameSql = 'SELECT id FROM member WHERE username=?';
        //创建并等待一个新的Promise，数据库查询完成时进行解析
        const checkUsernameResult = await new Promise((resolve, reject) => {
            //执行sql，并将查询结果传递给回调函数
            db.query(checkUsernameSql, [username], (err, results) => {
                //如果在执行查询时发生错误，我们将错误传递给Promise的reject
                if (err) return reject(err);
                //查询成功，将结果传给Promise的resolve
                resolve(results);
            });
        });

        //检查结果是否包含与给定username匹配的数据，且该数据的id与当前更新操作的id不同
        if (checkUsernameResult.length > 0 && checkUsernameResult[0].id != id) {
            //打印消息，username已经有重复值
            return res.send({code: 1, message: 'Username is already exists.'});
        }
    }

    //定义一个更新sql语句的初始部分
    let sql = 'UPDATE member SET ';
    //创建一个数组用于存储将要更新的字段
    let updateFields = [];
    //创建一个数组用于存储将要传递给db.query的参数值
    let arr = [];

    //遍历fields中的每个字段
    for (let field in fields) {
        //检查字段值是否已定义
        if (fields[field] !== undefined) {
            //如果已定义字段值，将字段名和占位符 ? 添加到updateFields数组中
            updateFields.push(`${field}=?`);
            //添加到arr数组中
            arr.push(fields[field]);
        }
    }

    //将updateFields数组中的字段名和占位符连接成一个字符串，并添加到sql语句的末尾
    sql += updateFields.join(', ') + ' WHERE id=?';
    //将成员的id添加到arr数组的末尾
    arr.push(Number(id));

    //使用db.query函数执行sql更新操作，并传入参数数组arr
    db.query(sql, arr, (err, results) => {
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        //打印success信息
        res.send({code: 0, message: 'Update Success!'});
    });
};

//删除member info
exports.deleteMemberInfoByID = (req, res) =>{
    let {id} = req.query;
    let sql = 'DELETE FROM member WHERE id=?';

    db.query(sql, id, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message:'Delete Member Information Success!'});
    });
};

//查询admin info
exports.listAdminInfo = (req, res) =>{
        //获取前端参数id, 根据id值顺序传递数据到前端
        let {id} = req.query;

        //查询admin列表的sql,传入id值，按照id顺序排列
        const adminSearchSql = 'SELECT * FROM admin';

        //调用admin query，查询总列表
        db.query(adminSearchSql, [id], (err, resList) =>{
            if (err) {
                return res.send({code: 1, message: err.message});
            }
            //返回给前端数据
            res.send({code: 0, data:{list: resList}})
        }
        )
};

//修改admin info
exports.editAdminInfo = (req, res) =>{
    let {id, admin, password} = req.query;
    let sql = 'UPDATE admin SET ';
    let arr = []; 

    //同时修改admin和password
    if (admin && password) {
        sql = sql + 'admin=?, password=? WHERE id=?'
        arr = [admin, password, Number(id)]
    }else if (admin) {
        sql = sql + 'admin=? WHERE id=?';
        arr = [admin, Number(id)];
    }else if (password) {
        sql = sql + 'password WHERE id=?';
        arr = [password, Number(id)];
    }

    //执行sql语句
    db.query(sql, arr, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message: 'Update Success!'});
    })
};

//查询rally info
exports.listRally = (req, res) =>{
    //获取前端参数id, 根据id值顺序传递数据到前端
    let {id} = req.query;

    //sql语句查询所有rally
    const rallySelectSql = 'SELECT * FROM rally';
    db.query(rallySelectSql, [id], (err, resRally) =>{
        if (err) {
            return res.send({code: 1, message: err.message})
        }
        //返回查询结果
        res.send({code: 0, data:{list: resRally}});
    })
}
//修改rally info
exports.updateRallyInfoByID = (req, res) =>{
    //定义rally中需要修改的参数
    let {id, mainTitle, subTitle, content, time, address, bulletin, album} = req.query;
    let sql = 'UPDATE rally SET ';
    let arr = [];

    if (mainTitle && subTitle && content && time && address && bulletin && album) {
        sql = sql + 'mainTitle=?, subTitle=?, content=?, time=?, address=?, bulletin=?, album=? WHERE id=?';
        arr = [mainTitle, subTitle, content, time, address, bulletin, album, Number(id)];
    } else if (mainTitle) {
        sql = sql + 'mainTitle=? WHERE id=?';
        arr = [mainTitle, Number(id)];
    } else if (subTitle) {
        sql = sql + 'subTitle=? WHERE id=?';
        arr = [subTitle, Number(id)];
    } else if (content) {
        sql = sql + 'content=? WHERE id=?';
        arr = [content, Number(id)];
    } else if (time) {
        sql = sql + 'time=? WHERE id=?';
        arr = [time, Number(id)];
    } else if (address) {
        sql = sql + 'address=? WHERE id=?';
        arr = [address, Number(id)];
    } else if (bulletin) {
        sql = sql + 'bulletin=? WHERE id=?';
        arr = [bulletin, Number(id)];
    }else if (album) {
        sql = sql + 'album=? WHERE id=?';
        arr = [album, Number(id)];
    }

    //执行sql语句
    db.query(sql, arr, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message: 'Update Success!'});
    })
}

//删除rally info
exports.deleteRallyInfoByID = (req, res) =>{
    let {id} = req.query;
    let sql = 'DELETE FROM rally WHERE id=?';

    db.query(sql, id, (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }
        res.send({code: 0, message:'Delete rally success!'});
    });
}

//设置rally status 为close
exports.closeRallyStatusByID =(req, res) =>{
    //获取参数id和status, 根据id值重新设置数据
    let {id, status} = req.query;

    //sql语句，将rally表中每个对应id值的status列名的open设置为close
    const setupStatusSql = 'UPDATE rally SET status = "Past" WHERE id =?';
    //执行语句，传入sql语句和参数
    db.query(setupStatusSql, [id, status], (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message})
        }
        //返回查询结果
        res.send({code: 0, message: 'Rally closed!'});
    })
}

//设置rally status 为close
exports.openRallyStatusByID =(req, res) =>{
    //获取参数id和status, 根据id值重新设置数据
    let {id, status} = req.query;

    //sql语句，将rally表中每个对应id值的status列名的open设置为close
    const setupStatusSql = 'UPDATE rally SET status = "Upcoming" WHERE id =?';
    //执行语句，传入sql语句和参数
    db.query(setupStatusSql, [id, status], (err, results) =>{
        if (err) {
            return res.send({code: 1, message: err.message})
        }
        //返回查询结果
        res.send({code: 0, message: 'Rally opened!'});
    })
}

//查询member emailFormat
exports.listMemberFormat = (req, res) =>{
    //定义需要传入的变量值
    let {memberType, active, id} = req.query;
    //查询member列表的sql
    const searchMemberEmailFormatSql = 'SELECT GROUP_CONCAT(DISTINCT `emailFormate` SEPARATOR \'\') as results FROM member WHERE memberType =? AND active =?';
    // const searchMemberEmailFormatSql = 'SELECT GROUP_CONCAT(DISTINCT `emailFormate` SEPARATOR \'\') as results FROM member';

    //条件语句 WHERE memberType = \'R\'
    //const searchMemberEmailFormatSql = 'SELECT GROUP_CONCAT(DISTINCT `emailFormate` SEPARATOR \'\') as results FROM member WHERE memberType = \'R\'';

    //调用member query，查询总列表
    db.query(searchMemberEmailFormatSql, [memberType, active, id], (err, resList) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }

        //print results
        res.send({code: 0, data:{list: resList}})
    })
}

exports.listAllEmailFormate = (req, res) =>{
    //查询member列表的sql
    const searchAllEmailList = "SELECT GROUP_CONCAT(DISTINCT emailFormate SEPARATOR \'\') as results FROM member  WHERE memberType IN ('R', 'LM', 'AM', 'P');";

    //查询总列表
    db.query(searchAllEmailList, (err, resList) =>{
        if (err) {
            return res.send({code: 1, message: err.message});
        }

        //print results
        res.send({code: 0, data:{list: resList}})
    })
}