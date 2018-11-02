<template>
    <section class="container">
        <div class="sider">
            <div class="create-post">
                <i 
                    class="el-icon-edit" />
                <span>新建文章</span>
            </div>
            <ul class="posts">
                <li  
                    v-for="(post, index) in posts"
                    :key="index"
                    class="post"
                    @click="handleClickPost(index)">
                    <i 
                        class="el-icon-document" />
                    <span class="post-title">{{ post.title }}</span>
                </li>
            </ul>
        </div>
        <div class="main">
            <div class="edit-title">
                <input 
                    v-model="title"
                    type="text" 
                    placeholder="请输入文章标题">
            </div>
            <!-- 显示编辑的原始文本 -->
            <mavon-editor 
                ref="md"
                v-model="postContent"
                @imgAdd="insertImg"/>
            <div class="btn-wrapper">
                <el-button 
                    type="primary" 
                    @click="savePost">保存文章</el-button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        layout: 'edit',
        components: {},
        async asyncData({ app }) {
            const res = await app.$axios.get('posts')
            const result = res.data

            let posts = []
            if (result.code === 0){
                posts = result.data
            }
            return {
                posts: posts
            }
        },
        data() {
            return {
                // 文章的id
                id: '',
                title: this.getTodayDate(),
                postContent: ''
            }
        },
        methods: {
            handleClickPost(index) {
                const post = this.posts[index]
                console.log(post)
                this.updateOpArea(post)
            },
            updateOpArea(post) {
                this.id = post._id
                this.title = post.title
                this.postContent = post.content
            },
            getTodayDate(){
                const d = new Date()
                const year = d.getFullYear()
                const month = d.getMonth() + 1
                const day = d.getDate()

                return `${year}-${month}-${day}`
            },
            async savePost() {
                const id = this.id
                const title = this.title
                const content = this.postContent

                if (title && content) {
                    if (!this.id) {
                        const insertResult = await this.$axios.post('post/add', {
                            title,
                            content
                        })
                        console.log('iiiiiiiiiiiii', insertResult)
                        if (insertResult.data.code === 0) {
                            this.$message({
                                message: '文章修改成功',
                                type: 'success'
                            })
                        } else {
                            this.$message({
                                message: '文章修改失败',
                                type: 'fail'
                            })
                        }
                    } else {
                        const editResult = await this.$axios.post('post/edit', {
                            id,
                            title,
                            content
                        })
                        console.log('eeeeeeeeeeeeeee', editResult)
                        if (editResult.data.code === 0) {
                            this.$message({
                                message: '文章修改成功',
                                type: 'success'
                            })
                        } else {
                            this.$message({
                                message: '文章修改失败',
                                type: 'fail'
                            })
                        }
                    }
                }
            },
            async insertImg(pos, $file) {
                console.log('pppppppppppppppp', pos, $file)
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.$axios({
                        url: 'post/addImg',
                        method: 'post',
                        data: formdata,
                        headers: { 
                            'Content-Type': 'multipart/form-data' 
                            },
                        }).then((res) => {
                            const {url} = res.data.data
                            console.log('rrrrrrrrrrrr', res)
                            const host = window.location.host
                            this.$refs.md.$img2Url(pos, `${url}`);
                        })
            }
        }
    };
</script>

<style>
    .container{
        display: flex;
    }
    .container .sider{
        width: 320px;
        height: 100%;
        overflow: auto;
    }
    .container .main{
        flex: 1;
    }
    .create-post, .post{
        height: 78px;
        display: flex;
        align-items: center;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
        padding-left: 20px;
        cursor: pointer;
    }
    .post:hover{
        background: #ddd;
    }
    .create-post{
        height: 40px;
    }
    .create-post > i{
        margin-right: 20px;
    }
    .post > i{
        margin-right: 20px;
        font-size: 24px;
        color: #ddd;
        margin-right: 10px;
    }
    .post:hover > i{
        color: #fff;
    }
    .posts .post:last-child{
        border-bottom: 0;
    }

    .edit-title input{
        display: block;
        width: 100%;
        height: 41px;
        box-sizing: border-box;
        border: 0;
        outline: none;
        appearance: none;
        border-bottom: 1px solid #ddd;
        padding: 0;
        margin: 0;
        padding-left: 20px;
        font-size: 20px;
        border-left: 1px solid #ddd;
    }
    .container .v-note-wrapper .v-note-op.shadow{
        box-shadow: none;
    }
    .container .v-note-wrapper .v-note-op .v-left-item, 
    .container .v-note-wrapper .v-note-op .v-right-item{
        border: 1px solid #ddd;
        border-top: 0;
    }
    .container .v-note-wrapper .v-note-panel.shadow{
        box-shadow: none;
        border-left: 1px solid #ddd;
    }

    .btn-wrapper{
        padding-top: 40px;
    }
</style>
