// 이 파일 실행시키려면 package.json 수정
// "main": "index_csv.js",
//   "scripts": {
//     "start": "node index_csv"
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
        const browser = await puppeteer.launch({headless: false});  // 화면에 보이는 옵션: true이면 안보이고 false 이면 보인다.
        // headless: process.env.NODE_ENV === 'production'   배포 상태이면 자동으로 true 옵션 주는 코드
        await Promise.all(records.map(async (movie, i) => {
            try {
                const page = await browser.newPage();
                await page.goto(movie[1]);

                // 태그 선택 방법1 : const 태그 핸들러 = awiat page.$(선택자);
                // const scoreEl = await page.$('.score.score_left .star_score');
                // if(scoreEl) {
                //     const text = await page.evaluate(tag => tag.textContent, scoreEl);
                //     result[i] = [movie[0], movie[1], text.trim()];  //순서를 보장하는 코드
                // }

                //  태그 선택 방법2 : evaluate 안에서 DOM API 사용하기
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
                await page.waitFor(3000);
                await page.close();
            } catch (e) {
                console.error(e);
            }
        }));
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