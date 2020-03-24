const puppeteer = require('puppeteer');

const db = require('./models');


const crawler = async () => {
  await db.sequelize.sync(); //DB 연결하기
  try {
    let browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications'],
    });
    let page = await browser.newPage();
    await page.setViewport({
      width: 1080,
      height: 1080,
    });
    await page.goto('http://spys.one/free-proxy-list/KR/'); //무료 프록시 사이트
    const proxies = await page.evaluate(() => {
      const ips = Array.from(document.querySelectorAll('tr > td:first-of-type > .spy14')).map((v) => v.textContent.replace(/document\.write\(.+\)/, '')); //ip주소
      const types = Array.from(document.querySelectorAll('tr > td:nth-of-type(2)')).slice(5).map((v) => v.textContent); //HTTP 등 
      const latencies = Array.from(document.querySelectorAll('tr > td:nth-of-type(6) .spy1')).map((v) => v.textContent); //속도 관련
      return ips.map((v, i) => {
        return {
          ip: v,
          type: types[i],
          latency: latencies[i],
        }
      });
    });
    const filtered = proxies.filter((v) => v.type.startsWith('HTTP')).sort((p, c) => p.latency - c.latency); //속도 제일 빠른 순서대로 HTTP 프록시 필터링
    await Promise.all(filtered.map(async (v) => {
      return db.Proxy.upsert({
        ip: v.ip,
        type: v.type,
        latency: v.latency,
      });
    })); //DB에 프록시 데이터 저장
    await page.close();
    await browser.close();
    const fastestProxies = await db.Proxy.findAll({
      order: [['latency', 'ASC']],
    }); //속도 빠른 순으로 가져오기
    browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${fastestProxies[0].ip}`],
    });
    const browser2 = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${fastestProxies[1].ip}`],
    });
    const browser3 = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1920,1080', '--disable-notifications', `--proxy-server=${fastestProxies[2].ip}`],
    });

    // 시크릿 창 띄우기 : const context = await browser.createIncognitoBrowserContext();
    const page1 = await browser.newPage();
    const page2 = await browser2.newPage();
    const page3 = await browser3.newPage();
    // //여러 사람이 접속하는 것 처럼 IP 여러개 사용 가능
    await page1.goto('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4+%EC%95%84%EC%9D%B4%ED%94%BC'); //내 IP 확인 링크
    await page2.goto('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4+IP');
    await page3.goto('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%B4+IP');
    // await page.waitFor(10000);
    // await page.close();
    // await browser.close();
    await db.sequelize.close();
  } catch (e) {
    console.error(e);
  }
};

crawler();