// 이 파일 실행시키려면 package.json 수정
// "main": "index_xlsx.js",
//   "scripts": {
//     "start": "node index_xlsx"
//   },

const xlsx = require('xlsx');
const axios = require('axios');
const cherrio = require('cheerio');
const add_to_sheet = require('./add_to_sheet');

const workbook = xlsx.readFile('xlsx/data.xlsx');
const ws = workbook.Sheets.영화목록;

/* Sheet 여러 개일 때 시트별로 코딩
 for(const name of workbook.SheetNames) {
     const ws = workbook.Sheet[name];
 }
*/

const records = xlsx.utils.sheet_to_json(ws); // 이차원 배열 리턴

/* [
  {
    '제목': '어벤져스',
    '링크': 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=72363'
  },
  {
    '제목': '겨울왕국',
    '링크': 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=100931'
  }
   ] */

for(const [i, movie] of records.entries()) {
    console.log(i, movie.제목, movie.링크);
}

const crawler = async () => {
    add_to_sheet(ws, 'C1', 's', '평점'); // 엑셀에 데이터 입력
    for(const [i, movie] of records.entries()) { // for of 는 순서는 보장되지만 속도가 비교적 느리다
        const response = await axios.get(movie.링크);
        if(response.status === 200) {
            const html = response.data;
            const $ = cherrio.load(html);
            const text = $('.score.score_left .star_score').text();
            console.log(movie.제목, '평점:', text.trim());
            const newCell = 'C' + (i + 2);
            add_to_sheet(ws, newCell, 'n', parseFloat(text.trim()));
        }
    };
    xlsx.writeFile(workbook, 'xlsx/result.xlsx');

    /* 
    await Promise.all(records.map(async (movie) => { //promise.all 은 동시에 진행되어 빠르지만 순서는 보장되지 않는다
        const response = await axios.get(movie.링크);
        //생략
    }
    */
};

crawler();