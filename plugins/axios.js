import { Message } from 'element-ui'

export default function ({ $axios, redirect, $message }) {

    $axios.onRequest(config => {
        console.warn('Req:', JSON.stringify(config))
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        console.error('Req Error:', error)
    })

    $axios.onResponse(res => {
        console.warn('Res:', JSON.stringify(res))
        const resData = res.data
        // 网络错误或业务错误
        if (res.status !== 200 || resData.code !== 0) {
            Message.error(resData.message || '网络错误')
        } else {
            // 只将返回报文中的data塞给业务页面
            return res.data
        }
    })
}