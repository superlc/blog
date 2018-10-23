const Router = require('koa-router')
// const ObjectId = require('mongodb').ObjectId

const router = new Router()

const db = require('../../db/index')
const Post = require('../../modules/post')

const md = require('../md')

// 获取文章列表
router.get('/api/posts', async (ctx, next) => {
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
router.post('/api/post/add', async (ctx, next) => {
    const {title, content} = ctx.request.body

    const connectResult = await db.connect()

    if (connectResult.status) {
        // 构建一个post实例
        const post = new Post({
            title,
            content
        }).getModel()
        const result = await post.save()
        console.log(result)

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

// 修改文章
router.post('/api/post/edit', async (ctx, next) => {
    const {id, title, content} = ctx.request.body

    const connectResult = await db.connect()

    if (connectResult.status) {
        // 构建一个post实例
        const post = new Post().getModel()
        const result = await post.updateOne({
            _id: id
        }, {
            title,
            content
        })
        console.log(result)
        if (result.n > 0) {
            ctx.body = {
                code: 0,
                data: {}
            }
        } else {
            ctx.body = {
                code: 999,
                data: {
                    message: '更新文章信息失败'
                }
            }
        }
    } else {
        ctx.body = {
            code: 999,
            message: connectResult.message
        }
    }
})

// 导出router
module.exports = router