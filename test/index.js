const translate = require('../lib/translate'); // 加载转换器
const path = require('path');
const filePath = 'demo.csv' //输入csv文件
const dirPath = 'dest\\'  // 输出文件夹路径
translate(path.resolve(__dirname, filePath), path.resolve(__dirname, dirPath));