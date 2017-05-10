const fs = require('fs');
const readline = require('readline');
const genSLDFile = require('./genSLDFile');
// const filePath = './sld.csv';


function iteratorCSVLine(filePath) {
  
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
    // 把数据转成SLD文件
    genSLDFile(line);
  });

  rl.on('close', () => {
    console.log('执行完毕');
  });
}

module.exports = iteratorCSVLine;