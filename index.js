/**
 * @author zte10191772 
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const translate = require('./lib/translate'); // 加载转换器
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '请输入要转换的CSV文件路径(输入exit退出):\n'
});

let isFileInput = true;
let filaPath;
let outputDir;

rl.prompt();
rl.on('line', (line) => {
    var data = line.trim();
  if (data === 'exit') { // 输入exit程序退出
      process.exit(1);
  }

  if (isFileInput) { // 文件名输入
      if (isFileExist(data) && isCSV(data)) { // 判断是否是有效的文件名,若有效则存储文件名,设置文件夹
        filePath = data; // 设置文件路径
        isFileInput = false; // 设置输出下一次输入为文件夹路径
        filaPath = data;
        rl.setPrompt('设置输出的文件夹路径:\n');
        rl.prompt();
      } else {
          console.log('无效的CSV文件路径.');
          rl.prompt();
      }    
  } else { // 文件夹输入
      console.log('文件夹为: ' + data);
    if (!isDir(data)) { // 不是有效的文件夹路径
        console.log('无效的文件夹路径,请重新输入:\n');
        rl.prompt();
    } else { // 有效的文件夹路径,则设置文件夹路径,并执行转换代码
        console.log('1111');
        isFileInput = true;
        outputDir = data;
        translate(filaPath,outputDir);
    }
  }
  
}).on('close', () => {
//   console.log('再见!');
  process.exit(0);
});


// 判断文件是否是CSV
function isCSV(filepath) {
  const csvReg = /.*\.csv$/;
  const result = csvReg.test(filepath);
  return result;
}

// 判断文件是否存在
function isFileExist(filepath) {
    try {
        fs.statSync(filepath).isFile();
    } catch (err) {
        // console.log(err);
        return false;
    }
    return true;
}

// 判断是否是文件夹
function isDir(filepath) {
    try {
        fs.statSync(filepath).isDirectory();
    } catch (err) {
        // console.log(err);
        return false;
    }
    return true;
}