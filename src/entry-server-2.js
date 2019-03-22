const Vue = require('vue')
const server = require('express')()
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8')
})

server.get('*', (req, res) => {
  renderer.renderToString(new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  }), (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8078)