import {Page} from "@playwright/test";
import {expect, test} from "../fixtures/custom-fixtures";

export abstract class BasePage {
    protected constructor(
        protected page: Page,
        protected url: string
        ) {
    }

    public async visit() {
        await test.step(`Переходим на страницу '${this.constructor.name}' по url ${this.url}`, async () => {
            await this.page.goto(this.url, {waitUntil: 'domcontentloaded'})
        })
    }

    public async shouldBeOpened() {
        await test.step(`Проверяем, что страница ${this.constructor.name} открыта со следующим url ${this.url}`, async () => {
            await expect(this.page).toHaveURL(this.url)
        })
    }
}