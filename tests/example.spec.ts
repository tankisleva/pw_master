import {test, expect} from '../fixtures/custom-fixtures';
import {GET_BOOKS_LIST, ONE_BOOK_MOCK} from "../mocks/book-mocks";

test.describe('login tests', () => {
    test.skip('login title', async ({page}) => {
        await page.goto('https://demoqa.com/login', {waitUntil: "domcontentloaded"})
        const title = page.locator('//h1')

        await expect(title).toHaveText('Login')
    })

    test('positive login', async ({app}) => {
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

    test('failed login', async ({app}) => {
        const userName = process.env.USER_NAME
        const password = 'qwe'

        await app.loginPage.visit()
        await app.loginPage.loginWithCredentials(userName, password)

        await app.loginPage.shouldHaveErrorMessage('Invalid username or password!')
    })

    test('login button exist', async ({app}) => {
        await app.mainPage.visit()
        await app.mainPage.shouldHaveLoginButton()
    })

    test('mocked one book', async ({app, mock, page}) => {
        await mock.routeGET(GET_BOOKS_LIST, ONE_BOOK_MOCK)

        // await page.pause()

        await app.mainPage.visit()
        await app.mainPage.shouldHaveCountOfBookTitles(1)
        await app.mainPage.shouldHaveBookTitleName('The Darkness That Comes Before')
    })

    test('second tab', async ({app}) => {
        await app.browserWindowsPage.visit()
        const newTab = await app.browserWindowsPage.openNewTab()

        await expect(newTab).toHaveURL('/sample')
    })

    test('failing test', async () => {
        expect(true).toEqual(false)
    })
})

// test
test.describe('parametrized tests', () => {
    test.beforeAll(async () => {
        console.log('This works BEFORE ALL tests')
    })

    test.afterAll(async () => {
        console.log('This works AFTER ALL tests')
    })

    test.beforeEach(async ({}, testInfo) => {
        console.log(`Test '${testInfo.title}' started`)
    })

    test.afterEach(async ({}, testInfo) => {
        console.log(`Test '${testInfo.title}' ended`)
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
        test(`test book title: ${bookName}`, async ({page}) => {
            await page.goto('https://demoqa.com/books', {waitUntil: 'domcontentloaded'})

            const bookNameElement = page.locator('//div[@role="gridcell"]//a', {hasText: bookName})
        })
    }
})