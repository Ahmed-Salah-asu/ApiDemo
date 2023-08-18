import { test,expect} from "@playwright/test";
import { faker } from "@faker-js/faker";
import User from "../models/USer";
import UserApi from "../apis/UserApi";
import TodoApi from "../apis/TodoApi";

test("should be able to add todo ",async({page})=>{
    const user=new User(faker.person.firstName("male"),faker.person.lastName("male"),faker.internet.email(),"Sa1234567");
    await page.goto('/signup');
    await page.type('[data-testid="first-name"]',user.getFirstName());
    await page.type('[data-testid="last-name"]',user.getLastName());
    await page.type('[data-testid="email"]',user.getEmail());
    await page.type('[data-testid="password"]',user.getPassword()),
    await page.type('[data-testid="confirm-password"]',user.getPassword());
    await page.click('[data-testid="submit"]');
    await page.click('[data-testid="add"]');
    await page.type('[data-testid="new-todo"]','Playwright');
    await page.click('[data-testid="submit-newTask"]');
    const todoText=await page.locator('[data-testid="todo-item"]').nth(0).innerText();
    await expect(todoText).toEqual('Playwright');
})


test("should be able to add todo using api ",async({page,request,context})=>{
    const user=new User(faker.person.firstName("male"),faker.person.lastName("male"),faker.internet.email(),"Sa1234567");
    const response = await new UserApi(request).Register(user);
    const RespnoseBody=await response.json();
    const AccessToken=RespnoseBody.access_token;
    const userID=RespnoseBody.userID;
    const firstName=RespnoseBody.firstName;
    user.setAccessToken(AccessToken);
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
    new TodoApi(request).addTodo(user);
    await page.goto('/todo');
    const todoText=await page.locator('[data-testid="todo-item"]').nth(0).innerText();
    await expect(todoText).toEqual('Playwright');
})


test("should be able to delete todo ",async({page})=>{
    const user=new User(faker.person.firstName("male"),faker.person.lastName("male"),faker.internet.email(),"Sa1234567");
    await page.goto('/signup');
    await page.type('[data-testid="first-name"]',user.getFirstName());
    await page.type('[data-testid="last-name"]',user.getLastName());
    await page.type('[data-testid="email"]',user.getEmail());
    await page.type('[data-testid="password"]',user.getPassword()),
    await page.type('[data-testid="confirm-password"]',user.getPassword());
    await page.click('[data-testid="submit"]');
    await page.click('[data-testid="add"]');
    await page.type('[data-testid="new-todo"]','Playwright');
    await page.click('[data-testid="submit-newTask"]');
     await page.click('[data-testid="delete"]');
    const notoDomessage=page.locator('[data-testid="no-todos"]');
    await expect(notoDomessage).toBeVisible();

})

test("should be able to delete todo using api ",async({page,request,context})=>{
    const user=new User(faker.person.firstName("male"),faker.person.lastName("male"),faker.internet.email(),"Sa1234567");
    const response = await new UserApi(request).Register(user);
    const RespnoseBody=await response.json();
    const AccessToken=RespnoseBody.access_token;
    const userID=RespnoseBody.userID;
    const firstName=RespnoseBody.firstName;
    user.setAccessToken(AccessToken)
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
    new TodoApi(request).addTodo(user);

    await page.goto('/todo');;
    await page.click('[data-testid="delete"]');
    const notoDomessage=page.locator('[data-testid="no-todos"]');
    await expect(notoDomessage).toBeVisible();

})