const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const crawler = async () => {
    try {
        const browser = await puppeteer.launch({headless: false, args:['--window-size=1920,1080', '--disable-notifications']});
        const page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080,
        });
        await page.goto('https://facebook.com');
        const id = process.env.EMAIL;
        const password = process.env.PASSWORD;

        //puppeteer API 기능
        await page.type('#email', id); //선택자, 입력내용
        //사람인척 상호작용하려면 다음과 같이 키보드 작동시키기 await page.keyboard.press('KeyA') 
        await page.type('#pass', password);
        await page.hover('#loginbutton');
        await page.waitFor(3000);
        await page.click('#loginbutton');
        //네트워크 상황에 따른 로그인 요청 응답 대기
        await page.waitForResponse((res) => {
            return res.url().includes('login_attempt'); //네트워크 탭에서 확인 가능
        })
        
        await page.keyboard.press('Escape');
        await page.click('#userNavigationLabel');
        await page.waitForSelector('li.navSubmenu:last-child');
        await page.waitFor(3000);
        await page.click('li.navSubmenu:last-child');


        /* alert, confirm, prompt 대응 방법 제로초 참고
        https://github.com/ZeroCho/nodejs-crawler/blob/master/8.facebook-login-logout/dialog.js */

    } catch (e) {
        console.error(e);
      }
}

crawler();