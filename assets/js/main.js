// ================ main.js ================
/**
 * 应用程序主入口和核心逻辑
 * 处理事件监听、用户交互和模块协调
 */
import { generateMLAFormat, formatDate } from './generator.js';

document.addEventListener('DOMContentLoaded', () => {
    // 设置今天的日期作为默认值
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    document.getElementById('due-date').value = formattedToday;
    
    // 主生成函数
    const generateBtn = document.getElementById('generate-btn');
    const preview = document.getElementById('mlaPreview');
    const placeholderText = document.querySelector('.placeholder-text');
    
    generateBtn.addEventListener('click', () => {
        const studentName = document.getElementById('student-name').value || "Your Name";
        const instructorName = document.getElementById('instructor-name').value || "Instructor's Name";
        const course = document.getElementById('course').value || "Course";
        const dateValue = document.getElementById('due-date').value;
        const pageNum = document.getElementById('page-number').value || "1";
        const title = document.getElementById('essay-title').value || "Essay Title";
        
        const mlaContent = generateMLAFormat(
            studentName, 
            instructorName, 
            course, 
            dateValue, 
            pageNum, 
            title
        );
        
        preview.innerHTML = mlaContent.content;
        preview.style.display = 'block';
        
        if (placeholderText) {
            placeholderText.style.display = 'none';
        }
        
        // 启用复制按钮
        document.getElementById('copy-btn').disabled = false;
    });
    
    // 复制页眉功能
    document.getElementById('copy-btn').addEventListener('click', function() {
        const headingLines = document.querySelectorAll('.mla-heading .mla-heading-line');
        if (headingLines.length === 0) {
            alert('Please generate the MLA format first');
            return;
        }
        
        let headingText = '';
        headingLines.forEach(line => {
            headingText += line.textContent + '\n';
        });
        
        navigator.clipboard.writeText(headingText).then(() => {
            const btn = this;
            const originalText = btn.textContent;
            btn.textContent = '✓ Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    });
    
    // DOCX模板下载
    document.getElementById('download-docx-btn').addEventListener('click', function() {
        const feedback = document.createElement('div');
        feedback.textContent = 'Starting download...';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.padding = '10px 20px';
        feedback.style.backgroundColor = '#8B0000';
        feedback.style.color = 'white';
        feedback.style.borderRadius = '4px';
        feedback.style.zIndex = '1000';
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
        
        const link = document.createElement('a');
        link.href = '#'; 
        link.download = 'MLA_Template.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});