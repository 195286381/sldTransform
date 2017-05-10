/**
 * @author zte10191772 
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const translate = require('./lib/translate'); // 加载转换器
let fileName = '';
let dirPath = '';

// 控制台交互
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '请输入要转换成SLD文件的CSV文件路径(输入exit退出):'
});

rl.prompt();



rl.on('line', (line) => { // 监听输入的命令行输入.
  switch(line.trim()) {
    case 'exit':
      rl.close();
      break;
    default: 
      {
        // if (dirPath === '') {
          // rl.prompt('请输入输出文件夹路径:');
        // }
        // translate(line.trim(), dirPath.trim());
        rl.prompt();
      }
      break; 
  }
}).on('close', () => {
  console.log('退出成功');
  process.exit(0);
});