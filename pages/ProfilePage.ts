import {BasePage} from "./BasePage";
import {expect} from "@playwright/test";

export class ProfilePage extends BasePage {
    private readonly userNameTitle = this.page.locator("//*[@id='userName-value']")

    constructor(page) {
        super(page, '/profile')
    }

    public async shouldHaveUserNameTitleText(userName: string) {
        await expect(this.userNameTitle).toHaveText(userName)
    }
}