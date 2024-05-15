import {expect, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

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
        await this.userNameInput.fill(userName)
    }

    public async fillPasswordInput(password: string) {
        await this.passwordInput.fill(password)
    }

    public async clickLoginButton() {
        await this.loginButton.click()
    }

    // assertions

    public async shouldHaveErrorMessage(errorText: string) {
        const errorMessage = this.page.getByText(errorText, {exact: true})
        await expect(errorMessage).toBeVisible()
    }
}