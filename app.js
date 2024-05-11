const express = require('express');
const path = require('path');

const app = express();

// 将 /assets 映射到运行目录的 /assets 下
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 将根目录的其他请求映射到 /public 下
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});