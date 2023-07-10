const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 加入路由器
const routes = require('./routes')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

require('./config/mongoose')
const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true
}))
//每一個req都會經過bodyParser使用urlencoded解析
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
    console.log(`App is running on port 3000.`)
})