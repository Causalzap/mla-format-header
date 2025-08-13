// build-content.js
const fs = require('fs');
const marked = require('marked');

// 转换所有Markdown文件
fs.readdirSync('./content').forEach(folder => {
  fs.readdirSync(`./content/${folder}`).forEach(file => {
    const md = fs.readFileSync(`./content/${folder}/${file}`, 'utf8');
    const html = marked.parse(md);
    const outputFile = file.replace('.md', '.html');

    // 包裹HTML模板
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${getTitle(md)}</title>
        <link rel="stylesheet" href="/css/article.css">
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    fs.writeFileSync(`./public/${folder}/${outputFile}`, fullHtml);
  });
});

function getTitle(md) {
  // 从Markdown提取标题
  return md.match(/# (.*)/)[1];
}