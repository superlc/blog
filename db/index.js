const MongoClient = require('mongodb').MongoClient
const config = require('./config')

module.exports = {
    /**
     * 连接数据库，返回数据库操作对象及相应的句柄
     */
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient
            .connect(config.dbUrl)
            .then(client => {
                const db = client.db(config.dbName)

                console.log(`数据库${config.dbName}连接成功`)

                resolve({
                    db,
                    client
                })
            })
            .catch(err => {
                console.log(`数据库${config.dbName}连接失败`)
                console.log('失败错误：')
                console.log(err)

                reject(err)
            })
        })
    }
}