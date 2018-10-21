const handler = require('../db')

handler.connect()
.then(res => {
  const {db, client} = res
  if(client){
    client.close()
  }
})
.catch(err => {
  console.log('测试数据库连接失败')
})