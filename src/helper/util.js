const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');


// url转图片
const urlToImg = (url) => {
  const mod = /^https:/.test(url) ? https : http;
  // 取文件扩展名
  const ext = path.extname(url) || '.webp'
  mod.get(url, res => {
    res.pipe(fs.createWriteStream(path.resolve(__dirname, `../../source/${Date.now()}${ext}`)))
  })
}

// base64转图片
const base64ToImg = (base64Str) => {
  // data:image/png;base64,/sdadsadsa 类似这种形式
  const matchs = base64Str.match(/^data:image\/(.+?);base64,(.+)$/);
  const file = path.resolve(__dirname, `../../source/${Date.now()}.${matchs[1]}`);
  const content = matchs[2];
  fs.writeFile(file, content, 'base64', (err) => {
    console.log('-----------')
    console.log(err)
    console.log('+++++++++++++')
  });
}

module.exports = {
  urlToImg,
  base64ToImg
}