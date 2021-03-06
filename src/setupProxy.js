const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://110.172.101.184:7001',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  )

  app.use(
    proxy('/video', {
      target: 'http://www.yiokl6.cloud',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/video': '/video'
      }
    })
  )
}
