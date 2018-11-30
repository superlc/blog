<template>
    <section class="page">
        <Header/>
        <div class="main">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="post-summary">
                <span class="post-time">{{ post.createTime }}</span>
                <!--
                <span class="post-readed-num">阅读 105</span>
                <span class="post-commented-num">评论 2</span>
                <span class="post-stared-num">喜欢 1</span>
                -->
            </div>
            <div class="post-content">
                <!--
                <div class="markdown-body">
                    <div v-html="post.content" />
                </div>
                -->
                <mavon-editor 
                    :subfield="false"
                    :default-open="defaultOpen"
                    :toolbars-flag="false"
                    :box-shadow="false"
                    :value="post.content"
                    code-style="vs" />
            </div>
            <!--
            <div class="post-op">
                <el-button 
                    type="primary" 
                    icon="el-icon-star-off"
                >喜欢</el-button>
            </div>
            -->
        </div>
    </section>
</template>

<script>
    import Header from '~/components/header.vue'

    export default {
        validate({params, query, store}) {
            return true
        },
        components: {
            Header
        },
        async asyncData({ params, app }) {
            const {id} = params
            const result = await app.$axios.get(`${id}/detail`, {
                id
            })
            let post = {}
            if (result.code === 0) {
                post = Object.assign({}, result.data)
            }

            Date.prototype.format = function(fmt) {
                var o = {
                    "M+" : this.getMonth()+1,                 //月份
                    "d+" : this.getDate(),                    //日
                    "h+" : this.getHours(),                   //小时
                    "m+" : this.getMinutes(),                 //分
                    "s+" : this.getSeconds(),                 //秒
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度
                    "S"  : this.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            }
            
            post.createTime = new Date(post.date).format('yyyy-MM-dd hh:mm:ss')

            console.log(post.createTime)
            return {
                post
            }
        },
        data() {
            return {
              defaultOpen: 'preview'
            }
        },
        methods: {
        }
    };
</script>

<style>

.main{
    width: 620px;
    margin-left: auto;
    margin-right: auto;
}
.post-title{
    margin-bottom: 10px;
}
.post-summary{
    margin-bottom: 10px;
}
.v-note-wrapper .v-note-panel{
  border: 0 !important;
}
/* Tabled Portrait */
@media screen and (max-width: 768px) {
    .main{
      width: 100%;
    }
    .post-title{
      padding-top: 20px;
      padding-left: 20px;
      padding-right: 20px;
    }
    .post-summary{
      padding-left: 20px;
      padding-right: 20px;
    }
}
</style>
