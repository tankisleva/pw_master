import {expect, Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import {test} from "../fixtures/custom-fixtures";

export class LoginPage extends BasePage {
    private readonly userNameInput = this.page.locator('#userName')
    private readonly passwordInput = this.page.locator('#password')
    private readonly loginButton = this.page.locator('#login')

    constructor(page: Page) {
        super(page, '/login')
    }

    public async loginWithCredentials(userName: string, password: string) {
        await this.fillUserInput(userName)
        await this.fillPasswordInput(password)
        await this.clickLoginButton()
    }

    public async fillUserInput(userName: string) {
        await test.step(`Заполняем поле userName следующим значением ${userName}`, async () => {
            await this.userNameInput.fill(userName)
        })
    }

    public async fillPasswordInput(password: string) {
        await test.step(`Заполняем поле password следующим значением ${password}`, async () => {
            await this.passwordInput.fill(password)
        })
    }

    public async clickLoginButton() {
        await test.step(`Нажимаем на кнопку логина`, async () => {
            await this.loginButton.click()
        })
    }

    // assertions

    public async shouldHaveErrorMessage(errorText: string) {
        await test.step(`Проверяем, что пишется сообщение об ошибке: ${errorText}`, async () => {
            const errorMessage = this.page.getByText(errorText, {exact: true})
            await expect(errorMessage).toBeVisible()
        })

    }
}