// config.js

// 配置Mermaid
export function initializeMermaid() {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose'
    });
}

// 配置Marked
export function configureMarked() {
    marked.setOptions({
        highlight: function (code, lang) {
            if (lang === 'mermaid') {
                return `<div class="mermaid">${code}</div>`;
            }

            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-'
    });
}