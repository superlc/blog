const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')

module.exports = {
    render(html) {
        // 对文章要展示的文章内容进行渲染
        const md = new MarkdownIt({
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) {}
                }
            
                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
            }
        })
        return md.render(html)
    }
}