const dbHandler = require('../db/index')

// 保护内部数据和方法，防止外部直接修改
const connectSymbol = Symbol()
const paramsSymbol = Symbol()
const collectionSymble = Symbol()

/**
 * 创建一个Module基类，负责数据库连接等公共操作
 */
class Module {
    constructor(cName, params = {}){
        // 
        if(typeof cName !== 'string' || cName.length <= 0){
            throw {
                message: 'Module必须设置相应的collection名称'
            }
        } else {
            this[collectionSymble] = cName
            // module的数据部分
            this[paramsSymbol] = {...params}
        }
    }
    [connectSymbol](){
        return dbHandler
        .connect()
    }
    /**
     * 向指定集合插入一条文档
     * @param {Object} document 
     */
    insert(){
        return new Promise((resolve, reject) => {
            console.log(this)
            console.log('params:', this[paramsSymbol])
            // 判断文档是否已经添加过，如果已添加则直接返回文档id
            const {_id} = this[paramsSymbol]
            if (_id){
                resolve(this[paramsSymbol])
            } else {
                this[connectSymbol]()
                .then(res => {
                    const {db, client} = res
                    const collection = db.collection(this[collectionSymble])

                    collection
                    .insertOne(this[paramsSymbol])
                    .then(result => {
                        client.close()

                        // 添加文档后，更新文档的id，避免重复添加
                        this[paramsSymbol]._id = result.insertedId

                        resolve(this[paramsSymbol])
                    })
                    .catch(err => {
                        client.close()
                        reject(err)
                    })
                })
            }
            
        })
    }
    /**
     * 在指定的集合里面查找内容，filter为空时返回自身数据
     * @param {Object} filter 
     */
    find(filter){
        return new Promise((resolve, reject) => {
            if (!filter) {
                resolve([this[paramsSymbol]])
            } else {
                this[connectSymbol]()
                .then(res => {
                    const {db, client} = res
                    const collection = db.collection(this[collectionSymble])

                    collection
                    .find(filter)
                    .toArray()
                    .then(results => {
                        client.close()
                        resolve(results)
                    })
                    .catch(err => {
                        client.close()
                        reject(err)
                    })
                })
            }
        })
    }
    /**
     * 更新按给定query查找的数据的值
     * @param {Object} newVal 
     */
    update(newVal) {
        return new Promise((resolve, reject) => {
            const params = this[paramsSymbol]
            if(!params._id) {
                reject({
                    message: '该数据尚未存档，无法执行更新'
                })
            } else {
                this[connectSymbol]()
                .then(res => {
                    const {db, client} = res
                    const collection = db.collection(this[collectionSymble])
                    
                    collection
                    .updateOne({
                        _id: params._id
                    }, { 
                        $set: newVal 
                    })
                    .then(result => {
                        client.close()
                        resolve(result)
                    })
                    .catch(err => {
                        client.close()
                        reject(err)
                    })
                })
            }
        })
    }
    /**
     * 从文档中删除自己
     */
    delete() {
        return new Promise((resolve, reject) => {
            const params = this[paramsSymbol]
            if (!params._id) {
                reject({
                    message: '该数据尚未存档，无法执行删除'
                })
            } else {
                this[connectSymbol]()
                .then(res => {
                    const {db, client} = res
                    const collection = db.collection(this[collectionSymble])

                    collection
                    .deleteOne({
                        _id: params._id
                    })
                    .then(result => {
                        client.close()
                        resolve(result)
                    })
                    .catch(err => {
                        client.close()
                        reject(err)
                    })
                })
            }
        })
    }
}

module.exports = Module