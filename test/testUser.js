const User = require('../modules/user')
const user = new User({
    _id: '5bb0ed4559f3432420e2fca3'
})

/*
user
.connect()
.then(res => {
    const {db, client} = res
    console.log('user module创建成功')
})
.catch(err => {
    console.log('user module创建失败')
})
*/
user.find({})
.then(users => {
    console.log(users)
    console.log(typeof users[0]._id)
})
