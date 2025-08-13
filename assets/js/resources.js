// ================ resources.js ================
/**
 * 资源中心相关功能
 * 处理标签切换和资源视图管理
 */
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            
            // 更新激活标签
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // 显示/隐藏部分
            if(tab === 'generator') {
                document.querySelector('.generator-container').style.display = 'grid';
                document.getElementById('resource-center').classList.remove('active');
                window.location.hash = 'generator';
            } else {
                document.querySelector('.generator-container').style.display = 'none';
                document.getElementById('resource-center').classList.add('active');
                window.location.hash = 'resources';
            }
        });
    });
    
    // 初始加载时检查URL哈希
    const hash = window.location.hash.substring(1);
    if(hash === 'resources') {
        document.querySelector('.tab-btn[data-tab="resources"]').click();
    }
    
    // 处理浏览器历史记录导航
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
        
        if(activeTab !== hash) {
            document.querySelector(`[data-tab="${hash}"]`)?.click();
        }
    });
}

export { initTabs };