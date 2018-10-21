const Post = require('../modules/post')

const postData = {
    title: 'post title',
    content: '### ssss',
    createTime: new Date(),
    author: 'cluo',
    comments: [],
    tags: []
}

const insertPost = async () => {
    const postIns = new Post(postData)
    return await postIns.insert()
}

const findPost = async (filter) => {
    const postIns = new Post(postData)
    return await postIns.find(filter)
}

insertPost()
    .then(insertResult => {
        console.log('insert successfully:', insertResult)
        return insertResult
    })
    .then(insertResult => {
        findPost({
            _id: insertResult._id
        })
            .then(findResult => {
                console.log('find successfully:', findResult)
            })
            .catch(err => {
                console.log('find failed:', err)
            })
    })
    .catch(err => {
        console.log('insert failed:', err)
    })