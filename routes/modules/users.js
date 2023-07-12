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
router.post('/login', (req, res, next) => {
    const { email, password } = req.body
    const errors = []

    if (!email) {
        errors.push({ message: '請輸入信箱。' })
    }
    if (!password) {
        errors.push({ message: '請輸入密碼。' })
    }
    if (errors.length) {
        req.session.loginForm = { email, password }
        return res.render('login', {
            errors,
        })
    }
    next()
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true

}), (req, res) => {
    const { email, password } = req.session.loginForm

    res.render('login', {
        email, 
        password,
        errors,
    })

})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    // 取得註冊表單參數
    const { name, email, password, confirmPassword } = req.body
    const errors = []

    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
        console.log('password:', password)
        console.log('confirmPassword:', confirmPassword)

        errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }

    // 檢查使用者是否已經註冊
    User.findOne({ email }).then(user => {
        // 如果已經註冊：退回原本畫面
        if (user) {
            errors.push({ message: '這個 Email 已經註冊過了。' })
            return res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        }

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


    })
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

module.exports = router