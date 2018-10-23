import axios from 'axios'

//定义fetch函数，config为配置
function fetch(config){
   //返回promise对象
   return new Promise((resolve,reject) =>{
       //创建axios实例，把基本的配置放进去
       const instance = axios.create({
           //定义请求文件类型
           headers:{
              'Content-Type': 'application/json',
            },
            // 请求超时  
            timeout: 10000,
            //定义请求根目录
            baseURL: 'https://www.cluo.me/blog/'
        });
       //请求成功后执行的函数
        instance(config)
        .then(res =>{
            console.log(res)
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        //失败后执行的函数
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

export function request(url, data, type = 'POST') {
    return fetch({
        url,
        method: type,
        data
    })
}