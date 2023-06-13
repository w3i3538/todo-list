// 引用express和express router
const express = require('express')
const router = express.Router()
// 引入模組
// 引入 home 模組程式碼
const home = require('./modules/home')
const todos = require('./modules/todos')

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)
router.use('/todos', todos)

//匯出路由模組
module.exports = router