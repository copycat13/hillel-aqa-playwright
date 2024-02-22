const { test, chromium } = require('@playwright/test');

test('api login', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const request = context.request;
    const authResp = await request.post(`${process.env.API_URL}/auth/signin`, {
        data: {
            email: process.env.HW22_EMAIL,
            password: process.env.HW22_PASSWORD,
            remember: false,
        },
    });
    const sid = authResp.headers()['set-cookie'].split(';')[0];
    console.log(authResp.headers());
    process.env.AUTH_SID = sid;
});
