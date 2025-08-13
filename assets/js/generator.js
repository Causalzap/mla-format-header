// ================ generator.js ================
/**
 * MLA格式生成器的核心功能模块
 * 包含日期格式化、MLA内容生成等工具函数
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function generateMLAFormat(studentName, instructorName, course, dueDate, pageNum, title) {
    const nameParts = studentName.split(' ');
    const lastName = nameParts[nameParts.length - 1] || studentName;
    
    return {
        lastName,
        formattedDate: formatDate(dueDate),
        content: `
            <div class="mla-header">${lastName} ${pageNum}</div>
            <div class="mla-heading">
                <div class="mla-heading-line">${studentName}</div>
                <div class="mla-heading-line">${instructorName}</div>
                <div class="mla-heading-line">${course}</div>
                <div class="mla-heading-line">${formatDate(dueDate)}</div>
            </div>
            <div class="mla-title">${title}</div>
            <div class="mla-content-sample">
                <p>This is where your essay begins. The first paragraph should introduce your topic and provide a thesis statement. Remember to follow MLA formatting guidelines throughout your paper.</p>
            </div>
        `
    };
}

export { formatDate, generateMLAFormat };