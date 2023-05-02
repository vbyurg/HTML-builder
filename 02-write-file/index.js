const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'input.txt');
const writeStream = fs.createWriteStream(filePath, {
  flags: 'a'
});

console.log('Введи текст. Для выхода введи "exit" или нажми Ctrl+C');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Досвидос');
    rl.close();
    writeStream.end();
    return;
  }

  writeStream.write(input + '\n');
});
