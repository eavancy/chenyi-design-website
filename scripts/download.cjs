const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err);
    });
  });
};

const dir = path.join(__dirname, '../src/components/lanyard');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

Promise.all([
  download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', path.join(dir, 'card.glb')),
  download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', path.join(dir, 'lanyard.png'))
]).then(() => console.log('Downloaded'))
  .catch(console.error);
