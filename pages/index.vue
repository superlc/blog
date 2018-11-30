<template>
    <section class="page">
        <Header/>
        <section class="container">
            <div class="sider">
                <!-- 个人介绍 -->
                <div class="personal-info">
                    <div class="pi-hd">关于作者</div>
                    <img 
                        class="head"
                        src="~static/img/head.jpg" 
                        alt="前端C罗">
                    <div class="personal-des">
                        {{ selfDes }}
                    </div>
                </div>
            </div>
            <div class="main">
                <div class="posts">
                    <nuxt-link 
                        v-for="post in posts"
                        :to="'/post/' + post._id" 
                        :key="post._id">
                        <div class="post">
                            <div class="post-title">
                                {{ post.title }}
                            </div>
                            <div class="post-date">
                                {{ post.createTimeText }}
                            </div>
                        </div>
                    </nuxt-link>                
                </div>
            </div>
        </section>
    </section>
</template>

<script>
    import Header from '~/components/header.vue'
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
    export default {
      components: {
          Header
      },
      async asyncData({ app }) {
            const result = await app.$axios.get('posts')

            let posts = []
            if (result.code === 0){
                posts = result.data.map(item => {
                    if (item.date) {
                        item.createTimeText = new Date(item.date).format('yyyy-MM-dd hh:mm:ss')
                    } else {
                        item.createTimeText = ''
                    }

                    return item
                })
          }
          return {
              posts: posts
          }
      },
      data() {
          return {
              selfDes: '曾就职于腾讯ISUX，主要从事UI开发工作；2016年离职去一家创业公司从事前端开发；2017年，本着改变社会保险现状的崇高理想，加入腾讯旗下微保，至今。内心始终坚持技术应该回馈社会，服务行业。'
          }
      },
      mounted() {
      },
      methods: {}
    };
</script>

<style>
    a{
        color: #4e4e4e;
        outline: none;
        text-decoration: none;
    }
    a:hover{
        text-decoration: underline;
    }
    .container{
        position: relative;
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }
    .container:after{
        content: '';
        display: block;
        clear: both;
        font-size: 0;
        line-height: 0;
    }
    .container .sider{
        float: left;
        width: 280px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 10px;
    }
    .pi-hd{
        height: 20px;
        text-indent: 10px;
        line-height: 20px;
        padding-bottom: 5px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
    }
    .personal-info .head{
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        float: left;
        margin-right: 10px;
    }
    .personal-des{
        line-height: 2;
    }
    .personal-des > span{
        font-weight: bold;
    }
    .container .main{
        margin-left: 300px;
    }

    .post{
        border-bottom: 1px solid #ddd;
        padding: 20px;
        display: flex;
        align-items: center;
    }
    .post:hover{
        background: #f8f8f8;
    }
    .post .post-title{
        flex: 1;
        font-size: 16px;
    }
    .posts >a:last-child .post{
        border-bottom: 0;
    }
    /* Tabled Portrait */
    @media screen and (max-width: 768px) {
        .header{
            display: none;
        }
        .container{
            width: 100%;
        }
        .container .sider{
            display: none;
        }
        .container .main{
            margin-left: 0;
        }
        .post-date{
            display: none;
        }
    }
</style>
