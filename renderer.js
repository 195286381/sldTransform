const { ipcRenderer } = require('electron');
const checkFile = require('./checkFile')
const translateSLD = require('./lib/translate');
const dirInput = document.getElementById('dirInput');
const filePathText = document.getElementById('filePathText')
const fileName = document.getElementById('fileName');
const dirPathText = document.getElementById('dirPathText');
const translate = document.getElementById('translate');
const outputConsole = document.getElementById('outputConsole');

filePathText.value = '';
dirPathText.value = '';

dirInput.onclick = () => {
    console.log('dirInput');
    ipcRenderer.send('popDirInputDiaLog'); // 弹出文件夹输入框
};

fileName.onclick = () => {
    console.log('fileName');
    ipcRenderer.send('popFileInputDiaLog'); // 弹出文件输入框
}


ipcRenderer.on('getFilePath', (event, args) => { // 监听获取到的文件名
    filePathText.value = args;
    enableTranslate();
});

ipcRenderer.on('getDirPath', (event, args) => { // 监听获取到的文件夹名
    dirPathText.value = args;
    enableTranslate();
})

// TODO: 完善单元测试
function enableTranslate() { // 文件名和文件路径都是输入后开启转换.
    let fileContent = filePathText.value;
    let dirContent= dirPathText.value;
    if (fileContent.trim().length !== 0 && dirContent.trim().length !== 0) {
        translate.disabled = '';
        translate.style.cursor = 'pointer';
    } else {
        translate.disabled = 'disabled';
        translate.style.cursor = 'not-allowed';
    }
}

function showInfo(str) {
    outputConsole.value = str;
    outputConsole.style.display = 'inline-block';
}

translate.onclick = () => {
    const fileContent = filePathText.value.trim();
    const dirContenteDir = dirPathText.value.trim();
    // 控制台打印文件输入路径
    console.log('---------------------------------------------------------------');
    console.log(`fileContent: ${fileContent}\n dirContenteDir: ${dirContenteDir}`);
    console.log('---------------------------------------------------------------');

    try {
        console.log(111);
        const checkInfo = checkFile(fileContent);
        if (checkInfo && checkInfo.isCorrect) {
            showInfo('校验成功,执行转换');
            translateSLD(fileContent, dirContenteDir);
        } else {
            showInfo(`校验失败: \n${checkInfo.Info}`);
            console.log(231);
        }
    } catch(error) {
            console.log(error);
            showInfo(error);
    }
}
