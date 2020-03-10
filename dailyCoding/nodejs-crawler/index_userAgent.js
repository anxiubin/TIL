// 이 파일 실행시키려면 package.json 수정
// "main": "index_userAgent.js",
//   "scripts": {
//     "start": "node index_userAgent"
//   },


const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs'); //파일 시스템 모듈
const puppeteer = require('puppeteer'); //Chromium 기반

const csv = fs.readFileSync('csv/data.csv'); // 파일 읽어들이기
const records = parse(csv.toString('utf-8')); // 버퍼를 문자열로 바꾸기


const crawler = async () => {
    try {
        const result = [];
        const browser = await puppeteer.launch({ headless: process.env.NODE_ENV === 'production'}); 
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36");
        //userAgent를 설정해서 봇이 아닌 사람이 한 것 처럼 속이는 방법
        for(const [i, movie] of records.entries()) {
            await page.goto(movie[1]);

            const text = await page.evaluate(() => {
                const scoreEl = document.querySelector('.score.score_left .star_score');
                if(scoreEl) {
                    return scoreEl.textContent;
                }
            });

            if(text) {
                result[i] = [movie[0], movie[1], text.trim()];
                console.log(movie[0], text.trim());
            }
            await page.waitFor(1000); //이렇게 하는 대신 클라우드를 통해 여러 서버를 이용해서 크롤링을 빠르게 할 수 있다
        };
        await page.close();
        await browser.close();
        const str = stringify(result); //이차원 배열을 문자열화 해서 새로운 csv 파일에 쓰기
        fs.writeFileSync('csv/result.csv', str);
    } catch (e) {
        console.error(e);
    }
}
    
    // const page = await browser.newPage();
    // await page.goto('https://naver.com');
    // await page.waitFor(3000);
    // await page.close();
    // await browser.close();



crawler();