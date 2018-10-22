const mongoose = require('mongoose')
const config = require('./config')

// 连接单例
let db = void(0)
module.exports = {
    connect() {
        return new Promise((resolve, reject) => {
            if (db) {
                resolve({
                    status: true,
                    message: 'Mongodb已连接过'
                })
            } else {
                mongoose.connect(`${config.dbUrl}/${config.dbName}`)

                db = mongoose.connection

                db.on('error', () => {
                    reject({
                        status: false,
                        message: '连接Mongodb失败'
                    })
                })

                db.once('open', () => {
                    resolve({
                        status: true,
                        message: '连接Mongodb成功'
                    })
                })
            }
        })
    }
}