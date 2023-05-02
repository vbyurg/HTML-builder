const fs = require('fs');
const path = require('path');

function copyDir(srcDir, destDir) {
  fs.access(destDir, (err) => {
    if (err) {
      fs.mkdir(destDir, (err) => {
        if (err) {
          console.error(`Error creating directory: ${destDir}`, err);
        } else {
          console.log(`Directory created: ${destDir}`);
        }
      });
    }
  });

  fs.readdir(srcDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${srcDir}`, err);
      return;
    }

    files.forEach((file) => {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      fs.lstat(srcPath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for file: ${srcPath}`, err);
          return;
        }

        if (stats.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          const readStream = fs.createReadStream(srcPath);
          const writeStream = fs.createWriteStream(destPath);

          readStream.on('error', (err) => {
            console.error(`Error reading file: ${srcPath}`, err);
          });

          writeStream.on('error', (err) => {
            console.error(`Error writing file: ${destPath}`, err);
          });

          writeStream.on('close', () => {
            console.log(`File copied: ${destPath}`);
          });

          readStream.pipe(writeStream);
        }
      });
    });
  });
}

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

copyDir(srcDir, destDir);