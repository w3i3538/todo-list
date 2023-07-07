// 引用express和express router
const express = require('express')
const router = express.Router()
// 引入模組
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')


// 將網址結構符合 / 字串的 request 導向 各模組 
router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

//匯出路由模組
module.exports = router