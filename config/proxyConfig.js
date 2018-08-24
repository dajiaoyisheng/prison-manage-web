module.exports = {
  proxy: {
    '/tupu': {
      target: 'http://192.168.10.106:8080',
      // target: 'http://172.16.1.116:3000',
      changeOrigin:true,
      pathRewrite: {
        '^/tupu':''
      }
    }
  }
}
