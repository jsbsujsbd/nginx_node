const db = require('../db')

exports.LoginApi = (req, res) => {
    const { account, pw } = req.body
    
    // 参数检查
    if (!account || !pw) {
        return res.status(400).send({ code: 400, msg: '参数缺失' })
    }

    // SQL 直接查特定账号
    db.query('SELECT * FROM login WHERE account = ?', [account], async (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send({ code: 500, msg: '服务器错误' })
        }
        
        if (results.length === 0) {
            return res.status(401).send({ code: 401, msg: '账号不存在' })
        }

        const user = results[0]
        
        // 密码比对（如果你存的是明文，先改成加密）
        // const match = await bcrypt.compare(pw, user.pw)
        const match = pw === user.pw  // 你现在明文用的这个
        
        if (!match) {
            return res.status(401).send({ code: 401, msg: '密码错误' })
        }

        res.send({ code: 200, msg: '登录成功', account: account })
    })
}

exports.addAccount = (req, res) => {
    const { account, pw } = req.body
    
    if (!account || !pw) {
        return res.status(400).send({ code: 400, msg: '参数缺失' })
    }

    db.query('SELECT * FROM login WHERE account = ?', [account], (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).send({ code: 500, msg: '服务器错误' })
        }

        if (results.length > 0) {
            return res.status(409).send({ code: 409, msg: '账号已存在' })
        }

        // 应该加密：const hash = await bcrypt.hash(pw, 10)
        db.query('INSERT INTO login (account, pw) VALUES (?, ?)', [account, pw], (err) => {
            if (err) {
                console.error(err)
                return res.status(500).send({ code: 500, msg: '注册失败' })
            }
            res.status(201).send({ code: 201, msg: '注册成功' })
        })
    })
}