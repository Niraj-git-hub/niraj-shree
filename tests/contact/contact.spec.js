//to get curly brackets press alt+123 and alt+125
import { test } from '@playwright/test';
import { LoginPage } from './login.po.js';
import { ContactPage } from '../../niraj-shree/contact.po.js';
const testData=require('../../fixtures/loginFixtures.json');
const contactTestData= require('../../fixtures/contactFixtures.json');
const{authenticateUser, createEntity, deleteEntity, getEntity, validateEntity}=require('../../utils/helper.spec.js');

let accessToken;

test.beforeEach(async({page})=>{
    const login=new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.userName, testData.validUser.password);
    await login.verifyValidLogin();
})

test.describe('Contact testcases', ()=>{
    test('add contact', async({page})=>{
        const contact=new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName, contactTestData.contact.dateofBirth, contactTestData.contact.email, contactTestData.contact.address, contactTestData.contact.city, contactTestData.contact.state, contactTestData.contact.postal, contactTestData.contact.country);
        await contact.viewContact();
    })
    test('Contact Edit test', async({page, request})=>{
        const Data={
            "firstName": "John",
            "lastName":"Doe",
            "birthdate":"1990-06-30",
            "email":"johndoe@gmail.com",
            "phone":"9898989898",
            "street1":"Address1",
            "city":"City1",
            "stateProvince":"State1",
            "postalCode":"12345",
            "country":"Nepal"
        };
        const constact=new ContactPage(page);
        await createEntity(Data, accessToken, '/contactEdit.firstName');
        accessToken=await authenticateUser(testData.validUser.userName, testData.validUser.password,{request});
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.verifyContactAdded(contactTestData.editedContact.firstName, contactTestData.editedContact.lastName, contactTestData.editedContact.dateOfBirth, contactTestData.editedContact.email, contactTestData.editedContact.phone, contactTestData.editedContact.address, contactTestData.editedContact.city, contactTestData.editedContact.state, contactTestData.editedContact.postal, contactTestData.editedContact.country);
    })
});

test.describe('Contact Testcases',()=>{




    test('Contact Delete Test', async({page,request})=>{
        const Data={
            "firstName":"John",
            "lastName":"Doe",
            "birthdate":"1990-06-30",
            "email":"johndoe@gmail.com",
            "phone":"9898989898",
            "street1":"Address1",
            "city":"City",
            "stateProvince":"State1",
            "postalCode":"12345",
            "country":"Nepal"
        };
        const contact=new ContactPage(page);
        accessToken=await authenticateUser(testData.validUser.userName,testData.validUser.page)
        await createEntity(Data, accessToken, '/contacts',{request});
        page.reload();
        await contact.viewContact();
        const id= await getEntity(accessToken,'/contacts','280',{request});
        await contact.contactDelete();
        await validateEntity(accessToken, '/contacts/${id}','404',{request});
    })
})

test.afterEach(async({page})=>{
    await page.close();
})