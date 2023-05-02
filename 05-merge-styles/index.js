const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(distDir, 'bundle.css');

fs.readdir(stylesDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const cssFiles = files.filter((file) => {
    const filePath = path.join(stylesDir, file);
    const fileStat = fs.lstatSync(filePath);
    return fileStat.isFile() && path.extname(filePath) === '.css';
  });

  const cssContents = cssFiles.reduce((acc, file) => {
    const filePath = path.join(stylesDir, file);
    const fileContents = fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      acc.push(data);
      if (acc.length === cssFiles.length) {
        fs.writeFile(outputFile, acc.join('\n'), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Styles merged!');
        });
      }
    });
    return acc;
  }, []);
});