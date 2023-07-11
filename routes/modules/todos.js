// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user._id
    const name = req.body.name

    // const todo = new Todo({ name })
    // return todo.save()
    //     .then(() => res.redirect('/'))
    //     .catch(error => console.log(error))
    //上下結果相等的(上是先建立todo實體再儲存(可做更多動作但這邊沒這需求)，下是直接建立一筆)
    return Todo.create({ name, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id

    return Todo.findOne({_id, userId})
        .lean()
        .then(todo => res.render('detail', { todo }))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id

    return Todo.findOne({ _id, userId })
        .lean()
        .then(todo => res.render('edit', { todo }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const { name, isDone } = req.body

    return Todo.findOne({ _id, userId })
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${_id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id

    return Todo.findOne({ _id, userId })
        .then(todo => todo.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


//匯出路由模組
module.exports = router