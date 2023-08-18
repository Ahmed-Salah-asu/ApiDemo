import { test ,expect} from "@playwright/test";
import {faker} from "@faker-js/faker";

test("should be able to register using APi",async({page,request,context})=>{
    const response =await request.post('/api/v1/users/register',{
        data:{
            email:faker.internet.email(),
            password:"Test1234",
            firstName:faker.person.firstName("male"),
            lastName:faker.person.lastName("male")
        },
    })
    const RespnoseBody=response.json();
    console.log(RespnoseBody);

})
/*
test("should be able to register ",async({page})=>{
    await page.goto('/signup');
    await page.type('[data-testid="first-name"]',faker.person.firstName("male"));
    await page.type('[data-testid="last-name"]',faker.person.lastName("male"));
    await page.type('[data-testid="email"]',faker.internet.email());
    await page.type('[data-testid="password"]',"Sa1234567"),
    await page.type('[data-testid="confirm-password"]',"Sa1234567");
    await page.click('[data-testid="submit"]')
    const welcomeMsg=page.locator('[data-testid="welcome"]');
    await expect(welcomeMsg).toBeVisible();

})*/