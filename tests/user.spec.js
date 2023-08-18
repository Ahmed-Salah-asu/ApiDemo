import { test ,expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import User from "../models/USer";
import RegisterPage from "../pages/RegisterPage";
import TodoPage from "../pages/TodoPage";

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
    const registerPage=new RegisterPage(page);
    registerPage.navigationToSignUp();
    registerPage.register(user);
    const todoPage =new TodoPage(page);
    await expect(todoPage.getWelcomeMsg()).toBeVisible();

})