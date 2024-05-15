import {expect, Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class MainPage extends BasePage {
    private readonly loginButton = this.page.locator('//button[@id="login"]')
    private readonly bookTitle = this.page.locator('//div[@role="gridcell"]//a')

    constructor(page: Page) {
        super(page, '/books')
    }

    public getUserTitleByName(name: string) {
        return this.page.getByText(name)
    }

    // assertions

    public async shouldHaveLoginButton() {
        await expect(this.loginButton).toBeVisible()
    }

    public async shouldHaveCountOfBookTitles(count: number) {
        await expect(this.bookTitle).toHaveCount(count)
    }

    public async shouldHaveBookTitleName(bookTitle: string) {
        await expect(this.bookTitle).toHaveText(bookTitle)
    }
}