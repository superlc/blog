
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

var bodyParser = require('koa-bodyparser');

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const router = require('./router/index')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 对请求的参数json化
  app.use(bodyParser());

  // 应用路由中间件
  app
  .use(router.routes())
  .use(router.allowedMethods())
  
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  // app.listen(port, host)
  app.listen(port)
  
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
