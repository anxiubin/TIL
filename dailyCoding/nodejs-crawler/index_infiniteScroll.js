const puppeteer = require('puppeteer'); // postman으로 요청 보냈을 때 이미지 로딩 상태 확인하기
const axios = require('axios');
const fs = require('fs');

fs.readdir('scrolledImg', (err) => {
    if (err) {
        console.error('scrolledImg 폴더가 없어 scrolledImg 폴더를 생성합니다.')
        fs.mkdirSync('scrolledImg');
    }
})

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://unsplash.com');
    let result = [];
    while (result.length <= 20) {
      const srcs = await page.evaluate(() => {
        window.scrollTo(0, 0);
        let imgs = [];
        const imgEls = document.querySelectorAll('.nDTlD'); 
        if (imgEls.length) {
          imgEls.forEach((v) => {
            let img = v.querySelector('img._2zEKz'); 
            if (img && img.src) {
              imgs.push(img.src);
            }
            v.parentElement.removeChild(v);
          });
        }
        window.scrollBy(0, 100);
        setTimeout(() => {
          window.scrollBy(0, 200);
        }, 500);
        return imgs;
      });
      result = result.concat(srcs);
      await page.waitForSelector('.nDTlD');
    }
    console.log(result);
    result.forEach(async (src) => {
        const imgResult = await axios.get(src.replace(/\?.*$/, ''), {
            responseType: 'arraybuffer',
        });
        fs.writeFileSync(`scrolledImg/${new Date().valueOf()}.jpeg`, imgResult.data);
    })
    await page.close();
    await browser.close();
  } catch (e) {
    console.error(e);
  }
};

crawler();
