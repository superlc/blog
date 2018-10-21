const Router = require('koa-router')
const ObjectId = require('mongodb').ObjectId
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const router = new Router()

const Post = require('../../modules/post')

// 获取文章列表
router.get('/api/getPosts', async (ctx, next) => {
    const postIns = new Post({})
    const posts = await postIns.find({})
    ctx.body = {
        code: 0,
        data: posts
    }
})

// 获取文章详情
router.get('/api/:id/detail', async (ctx, next) => {
    const {id} = ctx.params
    const postIns = new Post({
        _id: ObjectId(id)
    })
    const post = await postIns.find({
        _id: ObjectId(id)
    })

    // 对文章要展示的文章内容进行渲染
    const md = new MarkdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre class="hljs"><code>' +
                       hljs.highlight(lang, str, true).value +
                       '</code></pre>';
              } catch (__) {}
            }
        
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    post[0].content = md.render(post[0].content)

    ctx.body = {
        code: 0,
        data: post[0]
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