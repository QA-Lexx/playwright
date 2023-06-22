import { test, expect } from '@playwright/test';
const { test, expect } = require("@playwright/test");
const user = require("../user");

test.describe('Positive Test Suite', () => {
  test('Successful authorization', async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(user.email);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(user.password);
    await page.getByTestId('login-submit-btn').click();
    const titleText = await page.textContent('h2');
    await expect(page.getByRole('heading', { name: 'Мои курсы и профессии' })).toHaveText(titleText);
  });
});

test.describe('Negative Test Suite', () => {
  test('Invalid email', async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill("test@test.ru");
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(user.password);
    await page.getByTestId('login-submit-btn').click();
    const titleText = await page.textContent('button');
    await expect(page.getByRole('login-error-hint', { name: 'Вы ввели неправильно логин или пароль' })).toHaveText(titleText);
  });
});