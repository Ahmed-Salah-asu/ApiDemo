import { test ,expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import User from "../models/USer";

test("should be able to register using APi",async({page,request,context})=>{
    const user=new User(faker.person.firstName("male"),faker.person.lastName("male"),faker.internet.email(),"Sa1234567");
    const response =await request.post('/api/v1/users/register',{
        data:{
            email:user.getEmail(),
            password:user.getPassword(),
            firstName:user.getFirstName(),
            lastName:user.getLastName()
        },
    })
    const RespnoseBody=response.json();
    console.log(RespnoseBody);

})


test("should be able to register ",async({page})=>{
    const user=new User(faker.person.firstName("male"),faker.person.lastName("male"),faker.internet.email(),"Sa1234567");
    await page.goto('/signup');
    await page.type('[data-testid="first-name"]',user.getFirstName());
    await page.type('[data-testid="last-name"]',user.getLastName());
    await page.type('[data-testid="email"]',user.getEmail());
    await page.type('[data-testid="password"]',user.getPassword()),
    await page.type('[data-testid="confirm-password"]',user.getPassword());
    await page.click('[data-testid="submit"]')
    const welcomeMsg=page.locator('[data-testid="welcome"]');
    await expect(welcomeMsg).toBeVisible();

})