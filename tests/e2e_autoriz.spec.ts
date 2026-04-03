import { test, expect } from '@playwright/test';

// селекторы для тестов
const selectors = {
    username: 'input#username',
    password: 'input[name="password"]',
    loginBut: 'button.radius',
    logout: 'a[href="/logout"]'
};

// креды для авторизации
const credentials = {
  login: 'tomsmith',
  password: 'SuperSecretPassword!',
};

//describe объединяет несколько тестов
//beforeEach повторяет перед каждым тестом
test.describe('e2e_autorize', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login', {
            waitUntil: 'networkidle', // Добавляем ожидание загрузки
            timeout: 50000
        });
});

test('Страница авторизации открыта', async ({ page }) => {
//const title = await page.getByRole('heading', { name: 'Login Page' })
//await expect (page.getByRole('heading', { name: 'Login Page' })).toBeVisible()})

// Проверяем, что поле username видимо на странице
        //await expect(page.locator(selectors.username)).toBeVisible();
        await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible();
});

test('Проверим успешную авторизацию', async ({ page }) => {
    // 1. Ждем загрузки поля username
        await page.waitForSelector(selectors.username, { 
            state: 'visible', 
            timeout: 50000 
        });
    
    // 2. Заполняем username
    await page.locator(selectors.username).fill(credentials.login);
    //await page.locator(selectors.password).click();

    // 3. Заполняем password 
    //await page.locator(selectors.password).press('ControlOrMeta+м');
    await page.locator(selectors.password).fill(credentials.password);
    // 4. Нажимаем кнопку Login
    await page.locator(selectors.loginBut).click();
    // 5. Ждем загрузки после авторизации
    await page.waitForLoadState('networkidle');
    // 6. Проверяем страницу акворизованного аккаунта
     await expect(page.getByText('Welcome to the Secure Area. When you are done click logout below.')).toBeVisible();
    //expect(title).toBe('The Internet');
    //await expect(page.getByText('Secure Area')).toBeVisible();
});

    test('Произведём успешную разавторизацию', async ({ page}) => {
    // 1. Ждем загрузки поля username
        await page.waitForSelector(selectors.username, { 
            state: 'visible', 
            timeout: 50000 
        });
    // 2. Заполняем username
    await page.locator(selectors.username).fill(credentials.login);
    //await page.locator(selectors.password).click();
    // 3. Заполняем password 
    await page.locator(selectors.password).fill(credentials.password);
    // 4. Нажимаем кнопку Login
    await page.locator(selectors.loginBut).click();
    // 5. Ждем загрузки после авторизации
    await page.waitForLoadState('networkidle');
    // 6. Проверяем страницу акворизованного аккаунта
    await expect(page.getByText('Welcome to the Secure Area. When you are done click logout below.')).toBeVisible();
    // 7. Нажимаем на кнопку Logout
    await page.locator(selectors.logout).click();  
    // 8. Ждем загрузки после авторизации
    await page.waitForLoadState('networkidle');
    // 9. Проверяем страницу авторизации
    await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible(); 
    });

    test('Ошибочная авторизация при пустых полях ввода Username и Password', async ({ page }) => {
    // 1. Ждем загрузки поля username
        await page.waitForSelector(selectors.username, { 
            state: 'visible', 
            timeout: 50000 
        });
    // 2. Нажимаем кнопку Login
    await page.locator(selectors.loginBut).click();
    // 3. Ждем загрузки после авторизации
    await page.waitForLoadState('networkidle');
    // 4. Проверяем страницу акворизованного аккаунта
    await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible();
    });

    test('Ошибочная авторизация при некорректных данных Username и Password', async ({ page }) => {
    // 1. Ждем загрузки поля username
        await page.waitForSelector(selectors.username, { 
            state: 'visible', 
            timeout: 50000 
        });
    // 2. Заполняем username
    await page.locator(selectors.username).fill(credentials.password);
    //await page.locator(selectors.password).click();
    // 3. Заполняем password 
    await page.locator(selectors.password).fill(credentials.login);
    // 4. Нажимаем кнопку Login
    await page.locator(selectors.loginBut).click();
    // 5. Ждем загрузки после авторизации
    await page.waitForLoadState('networkidle');
    // 6. Проверяем страницу акворизованного аккаунта
    await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible();
    });
});

