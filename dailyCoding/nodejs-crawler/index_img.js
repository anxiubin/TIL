// 이 파일 실행시키려면 package.json 수정
// "main": "index_img.js",
//   "scripts": {
//     "start": "node index_img"
//   },

const xlsx = require('xlsx');
const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx'); 
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

fs.readdir('screenshot', (err) => {
    if (err) {
        console.error('screenshot 폴더가 없어 screenshot 폴더를 생성합니다.');
        fs.mkdirSync('screenshot');
    }
});
fs.readdir('poster', (err) => {
    if (err) {
        console.error('poster 폴더가 없어 poster 폴더를 생성합니다.');
        fs.mkdirSync('poster');
    }
});

const crawler = async () => {
    try {
        const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080'] }); //브라우저 사이즈 조절
        const page = await browser.newPage();
        await page.setViewport({  //스크린화면 크기 조절
        width: 1920,
        height: 1080,
        });
        add_to_sheet(ws, 'C1', 's', '평점');
        for (const [i, r] of records.entries()) {
        await page.goto(r.링크);
        const result = await page.evaluate(() => {
            let score;
            const scoreEl = document.querySelector('.score.score_left .star_score');
            if (scoreEl) {
            let score = scoreEl.textContent
            }
            let img;
            const imgEl = document.querySelector('.poster img');
            if (imgEl) {
            img = imgEl.src;
            }
            return { score, img };
        });
        if (result.score) {
            const newCell = 'C' + (i + 2);
            console.log(r.제목, '평점', result.score.trim(), newCell);
            add_to_sheet(ws, newCell, 'n', result.score.trim());
        }
        if (result.img) {
            await page.screenshot({ // 전체페이지 스크린샷
              path: `screenshot/${r.제목}.png`, 
              fullPage: true, 
              //clip : x,y,width,height  (왼쪽 모서리 상단 기준으로 원하는 부분만 스크린샷)            
            }); 
            const imgResult = await axios.get(result.img.replace(/\?.*$/, ''), { //src뒤에 있던 쿼리 스트링 제거해서 더 좋은 화질의 파일로 가져올 수 있다
            responseType: 'arraybuffer', //buffer가 연속적으로 들어있는 자료구조
            }); // 이미지 요청해서 받아오기
            fs.writeFileSync(`poster/${r.제목}.jpg`, imgResult.data);
        }
        await page.waitFor(1000);
        }
        await page.close();
        await browser.close();
        xlsx.writeFile(workbook, 'xlsx/result.xlsx');
    } catch (e) {
        console.error(e);
    }
};
crawler();