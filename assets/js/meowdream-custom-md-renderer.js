const customRenderer = new marked.Renderer();

customRenderer.heading = function(text, level) {
    return `<h${level} class='my-4'>${text}</h${level}>`;
};

customRenderer.paragraph = function(text) {
    text = text.replace(/\[Copy\]([\s\S]*?)\[\/Copy\]/g, '<u><code class="copyable" title="点击复制" onclick="copyToClipboard(this.innerHTML)">$1</code></u>');
    return `<div class="my-3">${text}</div>`;
};

// 重写渲染器的link方法，根据链接内容进行自定义渲染
customRenderer.link = function(href, title, text) {
    // LinkButton: 开头的链接
    if (href.startsWith("LinkButton:")) {
        const link = href.substring(11);
        return `<a href="${link}" class="btn btn-secondary" role="button" target="_blank">${text}</a>`;
    }
    // Button: 开头的链接
    else if (href.startsWith("Button:")) {
        const f = href.substring(7);
        return `<button onclick="${f}" class="btn btn-primary">${text}</button>`;
    }
    // InPage: 开头的链接
    else if (href.startsWith("InPage:")) {
        const link = href.substring(7);
        return `<button class="btn btn-secondary" onclick="loadMarkdown('${link}')">${text}</button>`;
    }
    // 其他情况下的一般链接
    else {
        return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
    }
};

customRenderer.image = function(href, title, text) {
    return `<img src="${href}" title="${title}" alt="${text}" class="rounded img-fluid">`;
};

customRenderer.blockquote = function(quote) {
    return `<div class="my-3 blockquote">${quote}</div>`;
};

customRenderer.code = function(code, language, isEscaped) {
    return `<pre class="custom-code-block my-2"><code class="language-${language} rounded">${code}</code></pre>`;
};

customRenderer.hr = function() {
    return `<hr class="divider">`;
};

customRenderer.table = function(header, body) {
    return `
            <table class="table table-hover my-3">
            <thead>${header}</thead>
            <tbody>${body}</tbody>
            </table>`;
};