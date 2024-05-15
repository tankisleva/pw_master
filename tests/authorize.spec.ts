import {test, expect} from '../fixtures/custom-fixtures';
import {GET_BOOKS_LIST, ONE_BOOK_MOCK} from "../mocks/book-mocks";

test.describe('Тесты на demoqa.com', () => {
    test.skip('Проверка, что мы на странице логина', async ({page}) => {
        await page.goto('https://demoqa.com/login', {waitUntil: "domcontentloaded"})
        const title = page.locator('//h1')

        await expect(title).toHaveText('Login')
    })

    test('Позитивная авторизация', async ({app}) => {
        const userName = process.env.USER_NAME
        const password = process.env.PASSWORD

        await test.step('test steps', async () => {
            await app.loginPage.visit()
            await app.loginPage.fillUserInput(userName)
            await app.loginPage.fillPasswordInput(password)
            await app.loginPage.clickLoginButton()
        })

        await app.profilePage.shouldBeOpened()
        await app.profilePage.shouldHaveUserNameTitleText(userName)
    })

    test('Не корректный логин', async ({app}) => {
        const userName = process.env.USER_NAME
        const password = 'qwe'

        await app.loginPage.visit()
        await app.loginPage.loginWithCredentials(userName, password)

        await app.loginPage.shouldHaveErrorMessage('Invalid username or password!')
    })

    test('Проверка что кнопка логина существует', async ({app}) => {
        await app.mainPage.visit()
        await app.mainPage.shouldHaveLoginButton()
    })

    test('Проверка названия замоканой книги', async ({app, mock, page}) => {
        await mock.routeGET(GET_BOOKS_LIST, ONE_BOOK_MOCK)

        // await page.pause()

        await app.mainPage.visit()
        await app.mainPage.shouldHaveCountOfBookTitles(1)
        await app.mainPage.shouldHaveBookTitleName('The Darkness That Comes Before')
    })

    test('Проверка открытия новой вкладки', async ({app}) => {
        await app.browserWindowsPage.visit()
        const newTab = await app.browserWindowsPage.openNewTab()

        await expect(newTab).toHaveURL('/sample')
    })

    test('Зафейленый тест', async () => {
        expect(true).toEqual(false)
    })
})

// test
test.describe('Параметризированные тесты для проверки названий книг', () => {
    test.beforeAll(async () => {
        console.log('Эта штука отрабатывает ДО всех тестов')
    })

    test.afterAll(async () => {
        console.log('Эта штука отрабатывает ПОСЛЕ всех тестов')
    })

    test.beforeEach(async ({}, testInfo) => {
        console.log(`Тест '${testInfo.title}' начался. Отрабатывает ДО каждого теста`)
    })

    test.afterEach(async ({}, testInfo) => {
        console.log(`Тест '${testInfo.title}' завершился. Отрабатывает ПОСЛЕ каждого теста`)
    });

    const bookNames = [
        'Git Pocket Guide',
        'Learning JavaScript Design Patterns',
        'Designing Evolvable Web APIs with ASP.NET',
        'Speaking JavaScript',
        "You Don't Know JS",
        'Programming JavaScript Applications',
        'Eloquent JavaScript, Second Edition',
        'Understanding ECMAScript 6',
    ]

    for (const bookName of bookNames) {
        test(`Проверка названия книги: ${bookName}`, async ({page}) => {
            await page.goto('https://demoqa.com/books', {waitUntil: 'domcontentloaded'})

            const bookNameElement = page.locator('//div[@role="gridcell"]//a', {hasText: bookName})
        })
    }
})