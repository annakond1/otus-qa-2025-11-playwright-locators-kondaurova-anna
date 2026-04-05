import { test, expect } from '@playwright/test';

// селекторы для тестов
const selectors = {
    username: 'input#username',
    password: 'input[name="password"]',
    loginBut: 'button.radius',
    logout: 'a[href="/logout"]',
    errorHint: 'a[href="#"]',
    gitHubBut: 'img[alt="Fork me on GitHub"]',
    gitHubPage: 'a[href="/saucelabs/the-internet/commits?author=diemol"]',
    //elementalSelenium: 'a[href="http://elementalselenium.com/"]'
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

test('Отображение страницы авторизации', async ({ page }) => {
        //const title = await page.getByRole('heading', { name: 'Login Page' })
        //await expect (page.getByRole('heading', { name: 'Login Page' })).toBeVisible()})

        // Проверяем, что поле username видимо на странице
        //await expect(page.locator(selectors.username)).toBeVisible();
        await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible();
});

test('Проверка успешной авторизации', async ({ page }) => {
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

test('Произверка успешной разавторизации', async ({ page}) => {
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

test('Проверка ошибочной авторизации при пустых полях ввода Username и Password', async ({ page }) => {
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

test('Проверка ошибочной авторизации при некорректных данных в полях Username и Password', async ({ page }) => {
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
      // 6. Проверяем страницу авторизованного аккаунта
      await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible();
});

test('Проверка ошибки авторизации с некорреткным паролем', async ({ page }) => {
        // 1. Ждем загрузки поля username
        await page.waitForSelector(selectors.username, { 
            state: 'visible', 
            timeout: 50000 
        });
        // 2. Заполняем username
        await page.locator(selectors.username).fill(credentials.login);
        // 3. Заполняем password 
        await page.locator(selectors.password).fill(credentials.login);
       // 4. Нажимаем кнопку Login
       await page.locator(selectors.loginBut).click();
       // 5. Ждем загрузки после авторизации
       await page.waitForLoadState('networkidle');
       // 6. Проверяем страницу авторизации
      await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible();
});

test('Проверка ошибки авторизации с пустым паролем', async ({ page }) => {
    // 1. Ждем загрузки поля username
        await page.waitForSelector(selectors.username, { 
            state: 'visible', 
            timeout: 50000 
        });
        // 2. Заполняем username
        await page.locator(selectors.username).fill(credentials.login);
       // 3. Нажимаем кнопку Login
       await page.locator(selectors.loginBut).click();
       // 4. Ждем загрузки после авторизации
       await page.waitForLoadState('networkidle');
       // 5. Проверяем страницу авторизации
      await expect(page.getByText('This is where you can log into the secure area. Enter ')).toBeVisible();

});

test('Проверка подсказки на странице авторизации при ошибке авторизации (появление и закрытие)', async ({ page}) => {
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
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
    await page.locator(selectors.errorHint).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('This is where you can log into the secure area. Enter ')).not.toBeHidden();
});

test('Проверка успешной авторизации при отображении подсказки об ошибке предыдущей авторизации', async ({ page }) => {
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
    // 5. Заполняем username
    await page.locator(selectors.username).fill(credentials.login);
    // 6. Заполняем password 
    await page.locator(selectors.password).fill(credentials.password);
    // 7. Нажимаем кнопку Login
    await page.locator(selectors.loginBut).click();
    // 8. Ждем загрузки посля авторизации
    await page.waitForLoadState('networkidle');
    // 9. Проверяем страницу авторизованного аккаунта
     await expect(page.getByText('Welcome to the Secure Area. When you are done click logout below.')).toBeVisible();      
});

test('Проверка функции просмотра введённого пароля', async ({ page }) => {
     // 1. Ждем загрузки поля username
        await page.waitForSelector(selectors.username, { 
            state: 'visible', 
            timeout: 50000 
        });
    // 2. Заполняем password 
    await page.locator(selectors.password).fill(credentials.password);
    // 3. Кликаем в правую часть поля password
    await page.locator(selectors.password).click({ position: { x: 465, y: 15} });
    expect(page.locator(selectors.password)).toHaveValue('SuperSecretPassword!');
});

test('Проверка перехода в GitHub со страницы разавторизованного пользователя', async ({ page }) => {
    await page.locator(selectors.gitHubBut).click();
    await expect(page.locator(selectors.gitHubPage)).toBeVisible();   
});

test ('Проверка перехода по ссылке Elemental Selenium', async ({ page, context }) => {
    // Ждём открытия новой вкладки
    const [elSel] = await Promise.all([
      context.waitForEvent('page'),  // Ожидаем новую вкладку
      page.click('a[href="http://elementalselenium.com/"]') // Клик, который открывает вкладку
    ]);
    await page.waitForLoadState(); // Ждем загрузки после авторизации
    await expect(elSel).toHaveURL('https://elementalselenium.com');
    await expect(page.getByText('Elemental Selenium')).toBeVisible(); // проверка новой вкладки
});
});


