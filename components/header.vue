<template>
    <section class="header">
        <section class="inner">
            <p class="name">前端C罗</p>
        </section>
    </section>
</template>
<script>
    export default {
        name: 'Header'
    }
</script>
<style>
    .header{
        background: #fff;
        margin-bottom: 20px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }
    .header .inner{
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }
    .header .name{
        font-size: 18px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
    }
</style>

