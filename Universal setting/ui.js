// ui.js
import { renderMarkdown } from './render.js';
import { getSidebarConfig } from './sidebarConfig.js';

// 动态加载导航栏
export function loadNavbar() {
    return fetch('../../Universal setting/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => {
            console.error('加载导航栏失败:', error);
            document.getElementById('navbar-container').innerHTML = `
                <nav class="navbar">
                    <div class="nav-container">
                        <p style="color: #e53e3e; padding: 15px;">导航栏加载失败，请检查网络连接</p>
                    </div>
                </nav>
            `;
        });
}

// 动态加载页脚
export function loadFooter() {
    return fetch('../../Universal setting/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('加载页脚失败:', error);
            document.getElementById('footer-container').innerHTML = `
                <footer class="footer">
                    <p style="color: #e53e3e;">页脚加载失败</p>
                </footer>
            `;
        });
}

// 动态生成侧边栏内容
export function renderSidebar() {
  const sidebarContainer = document.getElementById('sidebar-container');
  if (!sidebarContainer) return;

// 获取当前页面文件名（添加解码）
  let currentPage = window.location.pathname.split('/').pop();
  currentPage = decodeURIComponent(currentPage); // 解码URI组件

  // 获取侧边栏配置
  const sidebarItems = getSidebarConfig(currentPage);
  
  // 生成侧边栏HTML
  let sidebarHTML = `
    <div class="sidebar-header">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      </h2>
    </div>
  `;
  
  sidebarItems.forEach(item => {
    const activeClass = item.active ? 'active' : '';
    sidebarHTML += `
      <div class="sidebar-item ${activeClass}" data-file="${item.file}">
        ${item.title}
      </div>
    `;
  });
  
  sidebarContainer.innerHTML = sidebarHTML;
  
  // 返回所有侧边栏项用于后续绑定事件
  return sidebarContainer.querySelectorAll('.sidebar-item');
}


// 更新侧边栏标题
export function updateSidebarHeader() {
    const pageTitle = document.title;
    // 提取"-"后面的内容作为侧边栏标题
    const titleParts = pageTitle.split('-');
    const sidebarTitle = titleParts.length > 1
        ? titleParts[titleParts.length - 1].trim()
        : pageTitle;

    const sidebarHeader = document.querySelector('.sidebar-header h2');
    if (sidebarHeader) {
        // 保留SVG图标只更新文本内容
        const svg = sidebarHeader.querySelector('svg');
        sidebarHeader.innerHTML = svg ? svg.outerHTML + sidebarTitle : sidebarTitle;
    }
}

// 初始化UI
export function initUI() {
    // 渲染侧边栏并获取侧边栏项
    const sidebarItems = renderSidebar();

    // 更新侧边栏标题
    updateSidebarHeader();

    if (!sidebarItems || sidebarItems.length === 0) {
        console.error('侧边栏项未找到');
        return;
    }

    let initialDocument = null;

    // 查找活动项或第一个项
    sidebarItems.forEach(item => {
        if (item.classList.contains('active')) {
            initialDocument = item.getAttribute('data-file');
        }
    });

    // 如果没有活动项，使用第一个项
    if (!initialDocument) {
        initialDocument = sidebarItems[0].getAttribute('data-file');
        sidebarItems[0].classList.add('active');
    }

    // 初始渲染
    if (initialDocument) {
        renderMarkdown(initialDocument);
    }

    // 添加侧边栏点击事件
    sidebarItems.forEach(item => {
        item.addEventListener('click', function () {
            // 添加点击动画
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // 更新活动状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // 渲染对应内容
            const fileName = this.getAttribute('data-file');
            renderMarkdown(fileName);
        });
    });

    // 添加导航链接效果
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            // 获取点击位置
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 设置波纹位置
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // 移除波纹
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}