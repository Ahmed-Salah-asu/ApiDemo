import { Page } from "@playwright/test"

export default class TodoPage{
    private page:Page;
    constructor(page:Page){
        this.page=page;
    }
     private get welcomeMsg(){
        return '[data-testid="welcome"]';
    }
    getWelcomeMsg(){
        return this.page.locator(this.welcomeMsg);
    }
}