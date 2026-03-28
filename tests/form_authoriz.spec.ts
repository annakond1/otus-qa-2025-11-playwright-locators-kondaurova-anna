import { test, expect } from '@playwright/test';

test('Проверка локатора авторизации', async ({ page }) => {
    await page.goto('https://rwa-188.130.251.61.sslip.io/login');
    
// 1) Найдите локатор формы авторизации
// проверяем название страницы "Sigh in"
    //await expect(page.getByTitle('Conduit')).toHaveText("Conduit");
    await expect(page.locator('h1.text-xs-center')).toBeVisible();

// 2) Найдите локаторы полей Email password
    await expect(page.locator('input[formcontrolname="email"]')).toBeVisible();
    await expect(page.locator('input[formcontrolname="password"]')).toBeVisible();
    
// 3) Найти локатор кнопки Войти в хедере
   await expect(page.locator('a[href="/register"]')).toBeVisible();
})
