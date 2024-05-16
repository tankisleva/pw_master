import {BasePage} from "./BasePage";
import {expect} from "@playwright/test";
import {test} from "../fixtures/custom-fixtures";

export class ProfilePage extends BasePage {
    private readonly userNameTitle = this.page.locator("//*[@id='userName-value']")

    constructor(page) {
        super(page, '/profile')
    }

    public async shouldHaveUserNameTitleText(userName: string) {
        await test.step(`Проверяем что в тайтле присутствует следующий userName: ${userName}`, async () => {
            await expect(this.userNameTitle).toHaveText(userName)
        })
    }
}