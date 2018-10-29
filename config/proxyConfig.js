module.exports = {
  // 这样就可以把http://localhost:8080/api/代理到http://localhost:3000/api.
  proxyTable: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  },
}
 