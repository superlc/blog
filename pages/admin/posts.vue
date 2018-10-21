<template>
    <section class="container">
        <div class="sider">
            <div class="create-post">
                <i 
                    class="el-icon-edit" />
                <span>新建文章</span>
            </div>
            <ul class="posts">
                <li class="post">
                    <i 
                        class="el-icon-document" />
                    <span class="post-title">我是一片优秀的文章</span>
                </li>
                <li class="post">
                    <i 
                        class="el-icon-document" />
                    <span class="post-title">我是一片优秀的文章</span>
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
                v-model="postContent"/>
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
        asyncData({}) {

        },
        data() {
            return {
                title: this.getTodayDate(),
                postContent: ''
            }
        },
        methods: {
            getTodayDate(){
                const d = new Date()
                const year = d.getFullYear()
                const month = d.getMonth() + 1
                const day = d.getDate()

                return `${year}-${month}-${day}`
            },
            async savePost() {
                const title = this.title
                const content = this.postContent

                if (title && content) {
                    const insertResult = await this.$axios.post('createPost', {
                        title,
                        content
                    })
                    console.log(insertResult)
                }
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
