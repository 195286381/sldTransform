const fs = require('fs');
const readline = require('readline');
const genSLDFile = require('./genSLDFile');

function iteratorCSVLine(filePath, outputDir) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath)
  });
  let titleLine = true;

  rl.on('line', (line) => { //每一行CSV生成一个SLD文件
    if (titleLine) { // 忽略标题行
      titleLine = false;
      console.log('\n');
      return;
    }
    // console.log(line);
    genSLDFile(line, outputDir);    // 把每行数据转成SLD文件
  });

  rl.on('close', () => {
    console.log('执行完毕');
  });
}

module.exports = iteratorCSVLine;
