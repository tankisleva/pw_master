import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";

export class BrowserWindowsPage extends BasePage {
    public readonly newPageButton = this.page.locator('//*[@id="tabButton"]')

    constructor(page: Page) {
        super(page, 'https://demoqa.com/browser-windows');
    }

    public async openNewTab() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.newPageButton.click()
        ])

        return newPage
    }
}