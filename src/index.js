// 从百度图片那里爬取图片
// 搜索关键词 狗
const puppeteer = require('puppeteer');
const { urlToImg, base64ToImg } = require('./helper/util');

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1440,
      height: 9999
    }
  });
  const page = await browser.newPage();
  await page.goto('https://image.baidu.com');
  // 获取输入框
  const input = await page.$('#kw');
  // 然后输入内容
  await input.type('哈士奇');
  // 获取按钮
  const btn = await page.$('.s_newBtn');
  // 触发按钮点击
  await btn.click();
  // 等待元素加载完后
  await page.waitForSelector('img.main_img');
  const imgs = await page.$$eval('img.main_img', imgs => {
    return imgs.map(img => img.src);
  });

  imgs.forEach(img => {
    if (/^http/.test(img)) {
      urlToImg(img)
    } else {
      base64ToImg(img)
    }
  })
  
  await browser.close();
})();