// render.js
import { docFiles} from './contentConfig.js';

// 当前选中的文档（初始化为null）
let currentDocument = null;

// 渲染Markdown内容
export async function renderMarkdown(fileName) {
    // 如果点击的是当前文档，则直接返回
    if (fileName === currentDocument) {
        return;
    }

    // 更新当前文档
    currentDocument = fileName;

    const renderElement = document.getElementById('markdown-render');
    const loadingElement = document.querySelector('.loading-container');

    // 显示加载状态
    renderElement.style.display = 'none';
    loadingElement.style.display = 'flex';

    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 添加加载动画效果
    loadingElement.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">正在加载...</div>
    `;

    try {
        // 获取Markdown文件
        const response = await fetch(docFiles[fileName]);
        if (!response.ok) throw new Error('文件加载失败');

        const markdownText = await response.text();

        // 渲染Markdown
        renderElement.innerHTML = marked.parse(markdownText);

        // 渲染Mermaid图表
        const mermaidElements = renderElement.querySelectorAll('.mermaid');
        if (mermaidElements.length > 0) {
            mermaidElements.forEach(element => {
                try {
                    const graphDefinition = element.textContent;
                    mermaid.render('mermaid-svg-' + Date.now(), graphDefinition, (svgCode) => {
                        element.innerHTML = svgCode;
                    });
                } catch (error) {
                    console.error('Mermaid渲染错误:', error);
                    element.innerHTML = `<div class="error">图表渲染失败: ${error.message}</div>`;
                }
            });
        }

        // 高亮代码块（排除mermaid）
        renderElement.querySelectorAll('pre code:not(.mermaid)').forEach((block) => {
            hljs.highlightElement(block);
        });

        // 显示渲染内容
        loadingElement.style.display = 'none';
        renderElement.style.display = 'block';

        // 添加内容显示动画
        renderElement.style.opacity = '0';
        renderElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            renderElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            renderElement.style.opacity = '1';
            renderElement.style.transform = 'translateY(0)';
        }, 50);
    } catch (error) {
        console.error('加载文档失败:', error);
        loadingElement.innerHTML = `
            <div class="error-message">
                <h3>文档加载失败</h3>
                <p>${error.message}</p>
                <p>请检查网络连接或稍后再试</p>
            </div>
        `;
    }
}