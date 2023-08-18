import { APIRequestContext, BrowserContext, Page, request } from "@playwright/test"
import User from "../models/USer";
import UserApi from "../apis/UserApi";
import Config from "../playwright.config"


export default class RegisterPage{
    private page:Page;
    private request:APIRequestContext;
    private context:BrowserContext;
    //Constructor
    constructor(page:Page,request:APIRequestContext,context:BrowserContext){
        this.page=page;
        this.request=request;
        this.context=context;
    }
    //element
    private get firstNameInput(){
        return '[data-testid="first-name"]'
    }
    private get lastNameInput(){
        return '[data-testid="last-name"]'
    }
    private get emailInput(){
        return '[data-testid="email"]'
    }
    private get passwordInput(){
        return '[data-testid="password"]'
    }
    private get ConfirmPasswordInput(){
        return '[data-testid="confirm-password"]'
    }
    private get submitButton(){
        return '[data-testid="submit"]'
    }

    //Methods
    async navigationToSignUp(){
        await this.page.goto('/signup');
    }
    async register(user:User){
        await this.page.type(this.firstNameInput,user.getFirstName());
        await this.page.type(this.lastNameInput,user.getLastName());
        await this.page.type(this.emailInput,user.getEmail());
        await this.page.type(this.passwordInput,user.getPassword()),
        await this.page.type(this.ConfirmPasswordInput,user.getPassword());
        await this.page.click(this.submitButton)
    }
    async RegisterUsingApi(user:User)
    {
        const response=await new UserApi(this.request).Register(user);
        const RespnoseBody=await response.json();
        const AccessToken=RespnoseBody.access_token;
        const userID=RespnoseBody.userID;
        const firstName=RespnoseBody.firstName;
        await this.context.addCookies([
        {
        name:'access_token',
        value:AccessToken,
        url:Config.use?.baseURL
    },
    {
        name:'userID',
        value:userID,
        url:Config.use?.baseURL
    },
    {
        name:'firstName',
        value:firstName,
        url:Config.use?.baseURL
    }
    ])
}
}