const Router = require('koa-router')
// const ObjectId = require('mongodb').ObjectId

const router = new Router()

const db = require('../../db/index')
const Post = require('../../modules/post')

const md = require('../md')

// 获取文章列表
router.get('/api/getPosts', async (ctx, next) => {
    const connectResult = await db.connect()

    if (connectResult.status) {
        // 构建一个post实例
        const post = new Post()
                        .getModel()
        const result = await post.find({})
        // console.log(result)
        ctx.body = {
            code: 0,
            data: result
        }
    } else {
        ctx.body = {
            code: 999,
            message: connectResult.message
        }
    }
})

// 获取文章详情
router.get('/api/:id/detail', async (ctx, next) => {
    const {id} = ctx.params
    
    const connectResult = await db.connect()

    if (connectResult.status) {
        // 构建一个post实例
        const post = new Post()
                        .getModel()
        const result = await post.findById(id)
        
        result.content = md.render(result.content)

        ctx.body = {
            code: 0,
            data: result
        }
    } else {
        ctx.body = {
            code: 999,
            message: connectResult.message
        }
    }
})

// 删除文章
router.post('/api/:id/delete', (ctx, next) => {

})

// 创建文章
router.post('/api/createPost', async (ctx, next) => {
    const {title, content} = ctx.request.body

    const post = new Post({
        title,
        content,
        author: 'cluo',
        createTime: new Date()
    })

    const result = await post.insert()

    if(result._id) {
        ctx.body = {
            code: 0,
            data: result
        }
    } else {
        ctx.body = {
            code: 999,
            data: err
        }
    }
})

// 导出router
module.exports = router