import { test,expect} from "@playwright/test";
import { faker } from "@faker-js/faker";
/*
test("should be able to add todo ",async({page})=>{
    await page.goto('/signup');
    await page.type('[data-testid="first-name"]',faker.person.firstName("male"));
    await page.type('[data-testid="last-name"]',faker.person.lastName("male"));
    await page.type('[data-testid="email"]',faker.internet.email());
    await page.type('[data-testid="password"]',"Sa1234567"),
    await page.type('[data-testid="confirm-password"]',"Sa1234567");
    await page.click('[data-testid="submit"]');
    await page.click('[data-testid="add"]');
    await page.type('[data-testid="new-todo"]','Playwright');
    await page.click('[data-testid="submit-newTask"]');
    const todoText=await page.locator('[data-testid="todo-item"]').nth(0).innerText();
    await expect(todoText).toEqual('Playwright');
})*/


test("should be able to add todo using api ",async({page,request,context})=>{
    const response =await request.post('/api/v1/users/register',{
        data:{
            email:faker.internet.email(),
            password:"Test1234",
            firstName:faker.person.firstName("male"),
            lastName:faker.person.lastName("male")
        },
    });
    const RespnoseBody=await response.json();
    const AccessToken=RespnoseBody.access_token;
    const userID=RespnoseBody.userID;
    const firstName=RespnoseBody.firstName;
    await context.addCookies([
        {
        name:'access_token',
        value:AccessToken,
        url:'https://todo.qacart.com/'
    },
    {
        name:'userID',
        value:userID,
        url:'https://todo.qacart.com/'
    },
    {
        name:'firstName',
        value:firstName,
        url:'https://todo.qacart.com/'
    }
    ])
    await request.post('/api/v1/tasks',{
        data:{
            isCompleted:false,
            item:"Playwright"
        },
        headers:{
            Authorization:`Bearer ${AccessToken}`
        }
    })
    await page.goto('/todo');
    const todoText=await page.locator('[data-testid="todo-item"]').nth(0).innerText();
    await expect(todoText).toEqual('Playwright');
})

/*
test("should be able to delete todo ",async({page})=>{
    await page.goto('/signup');
    await page.type('[data-testid="first-name"]',faker.person.firstName("male"));
    await page.type('[data-testid="last-name"]',faker.person.lastName("male"));
    await page.type('[data-testid="email"]',faker.internet.email());
    await page.type('[data-testid="password"]',"Sa1234567"),
    await page.type('[data-testid="confirm-password"]',"Sa1234567");
    await page.click('[data-testid="submit"]');
    await page.click('[data-testid="add"]');
    await page.type('[data-testid="new-todo"]','Playwright');
    await page.click('[data-testid="submit-newTask"]');
     await page.click('[data-testid="delete"]');
    const notoDomessage=page.locator('[data-testid="no-todos"]');
    await expect(notoDomessage).toBeVisible();

})*/

test("should be able to delete todo using api ",async({page,request,context})=>{
    const response =await request.post('/api/v1/users/register',{
        data:{
            email:faker.internet.email(),
            password:"Test1234",
            firstName:faker.person.firstName("male"),
            lastName:faker.person.lastName("male")
        },
    });
    const RespnoseBody=await response.json();
    const AccessToken=RespnoseBody.access_token;
    const userID=RespnoseBody.userID;
    const firstName=RespnoseBody.firstName;
    await context.addCookies([
        {
        name:'access_token',
        value:AccessToken,
        url:'https://todo.qacart.com/'
    },
    {
        name:'userID',
        value:userID,
        url:'https://todo.qacart.com/'
    },
    {
        name:'firstName',
        value:firstName,
        url:'https://todo.qacart.com/'
    }
    ])
    await page.goto('/todo');
    await page.click('[data-testid="add"]');
    await page.type('[data-testid="new-todo"]','Playwright');
    await page.click('[data-testid="submit-newTask"]');
    await page.click('[data-testid="delete"]');
    const notoDomessage=page.locator('[data-testid="no-todos"]');
    await expect(notoDomessage).toBeVisible();

})