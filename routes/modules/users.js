// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 passport
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})
// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'users/login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    // 取得註冊表單參數
    const { name, email, password, confirmPassword } = req.body
    // 檢查使用者是否已經註冊
    User.findOne({ email }).then(user => {
        // 如果已經註冊：退回原本畫面
        if (user) {
            res.render('register', {
                name,
                email,
                password,
                confirmPassword
            })
        } else {
            // 如果還沒註冊：寫入資料庫
            return User.create({
                name,
                email,
                password
            })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))

            // 上下是相等的
            // const newUser = new User({
            //     name,
            //     email,
            //     password
            // })
            // newUser
            //     .save()
            //     .then(() => res.redirect('/'))
            //     .catch(err => console.log(err))

        }
    })
})

module.exports = router