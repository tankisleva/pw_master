import {Page} from "@playwright/test";
import {MainPage} from "../pages/MainPage";
import {LoginPage} from "../pages/LoginPage";
import {ProfilePage} from "../pages/ProfilePage";
import {BrowserWindowsPage} from "../pages/BrowserWindowsPage";

export class App {
    public readonly mainPage = new MainPage(this.page)
    public readonly loginPage = new LoginPage(this.page)
    public readonly profilePage = new ProfilePage(this.page)
    public readonly browserWindowsPage = new BrowserWindowsPage(this.page)

    constructor(private page: Page) {
    }
}