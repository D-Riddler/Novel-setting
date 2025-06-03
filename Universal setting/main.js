// main.js
import { initializeMermaid, configureMarked } from './config.js';
import { loadNavbar, loadFooter, initUI } from './ui.js';
import { renderMarkdown } from './render.js';

// 初始化第三方库配置
initializeMermaid();
configureMarked();

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  // 加载导航栏和页脚
  Promise.all([
    loadNavbar(),
    loadFooter()
  ]).then(() => {
    // 初始化UI交互（包含侧边栏渲染）
    initUI();
  }).catch(error => {
    console.error('初始化失败:', error);
  });
});

