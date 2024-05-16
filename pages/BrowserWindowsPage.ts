import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {test} from "../fixtures/custom-fixtures";

export class BrowserWindowsPage extends BasePage {
    public readonly newPageButton = this.page.locator('//*[@id="tabButton"]')

    constructor(page: Page) {
        super(page, 'https://demoqa.com/browser-windows');
    }

    public async openNewTab() {
        await test.step(`Открываем новую табу`, async () => {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page'),
                this.newPageButton.click()
            ])

            return newPage
        })
    }

}