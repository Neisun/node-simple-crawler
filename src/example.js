// demo
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch();
  // 得到page
  const page = await browser.newPage();
  // 打开页面
  await page.goto('https://www.baidu.com');
  // 屏幕截图
  await page.screenshot({
    path: path.resolve(__dirname, `../source/${Date.now()}.png`),
    fullPage: true
  });
  // 关闭浏览器
  await browser.close();
})();