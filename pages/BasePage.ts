import {Page} from "@playwright/test";
import {expect, test} from "../fixtures/custom-fixtures";

export abstract class BasePage {
    protected constructor(
        protected page: Page,
        protected url: string
        ) {
    }

    public async visit() {
        await test.step(`going to '${this.constructor.name}' by url ${this.url}`, async () => {
            await this.page.goto(this.url, {waitUntil: 'domcontentloaded'})
        })
    }

    public async shouldBeOpened() {
        await test.step(`Checking that ${this.constructor.name} opened with url ${this.url}`, async () => {
            await expect(this.page).toHaveURL(this.url)
        })
    }
}