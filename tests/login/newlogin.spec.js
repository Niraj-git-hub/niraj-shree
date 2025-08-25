import {test} from '@playwright/test';

import {LoginPage} from './login.po.js';
const testData=require('../../fixtures/loginFixtures.json');
test.beforeEach(async({page})=>{
    await page.goto('/');
})

test.describe('Valid login tests',()=>{
    test('Login using username and password',async({page})=>{
        const login=new LoginPage(page);
        await login.login("Greetings new user","Shreeyan123");
        await login.verifyValidLogin();
    });
})
test.describe('Invalid login tests',()=>{
    test('Login using invalid username and password', async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.username,testData.invalidUser.password);
        await login.verifyValidLogin();
    });

    test('Login using username and invalid password', async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.username,testData.invalidUser.password);
        await login.verifyValidLogin();
    });
     test('Login using invalid login/loginusername and invalid password', async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.username,testData.invalidUser.passwords);
        
    });
}) 