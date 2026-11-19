import { test, expect } from '@playwright/test';
import fs from 'node:fs';

fs.mkdirSync('screenshots', { recursive: true });
fs.mkdirSync('videos', { recursive: true });

const MSG = 'Đăng ký thành công! Chúng tôi sẽ liên hệ xác nhận sớm.';

// Cuộn từ từ để kích hoạt hiệu ứng, rồi quay về đầu trang trước khi chụp
async function scrollThrough(page, step = 400, delay = 120) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += step) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(delay);
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
}

test('Screenshot desktop 1440px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await scrollThrough(page, 600, 60);
  await page.screenshot({ path: 'screenshots/desktop-full.png', fullPage: true });
  await expect(page.locator('#specialties .spec')).toHaveCount(6);
  await expect(page.locator('#doctors .doctor')).toHaveCount(4);
  await expect(page.locator('.credit')).toHaveText('Thiết kế bởi Mai Duy');
});

test('Mobile 375px: không scroll ngang, menu hoạt động', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await scrollThrough(page, 600, 60);
  await page.screenshot({ path: 'screenshots/mobile-full.png', fullPage: true });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  await page.locator('.burger').click();
  await expect(page.locator('#nav')).toHaveClass(/open/);
  await page.locator('#nav a', { hasText: 'Đội ngũ chuyên gia' }).click();
  await expect(page.locator('#nav')).not.toHaveClass(/open/);
});

test('Slider banner tự chuyển và bấm mũi tên', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.slide').nth(0)).toHaveClass(/active/);
  await page.locator('.hero__arrow--next').click();
  await expect(page.locator('.slide').nth(1)).toHaveClass(/active/);
});

test('Validate form: thiếu / sai SĐT, năm sinh sai', async ({ page }) => {
  await page.goto('/#dat-lich');
  const form = page.locator('#booking');
  await form.locator('[name=name]').fill('Nguyễn Văn A');
  await form.locator('button[type=submit]').click();
  await expect(form.locator('[name=phone] ~ .error')).toHaveText('Vui lòng nhập số điện thoại.');

  await form.locator('[name=phone]').fill('12345');
  await form.locator('[name=year]').fill('1800');
  await form.locator('button[type=submit]').click();
  await expect(form.locator('[name=phone] ~ .error')).toHaveText('Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.');
  await expect(form.locator('[name=year] ~ .error')).toContainText('Năm sinh từ 1900');
});

test('Popup đặt lịch mở / đóng', async ({ page }) => {
  await page.goto('/');
  await page.locator('.header [data-open-modal]').click();
  await expect(page.locator('#modal')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#modal')).toBeHidden();
});

test.describe('Video demo', () => {
  test('Cuộn trang → chọn chuyên khoa → đăng ký khám', async ({ browser, baseURL }) => {
    const size = { width: 1280, height: 720 };
    const context = await browser.newContext({ baseURL, viewport: size, recordVideo: { dir: 'test-results/video', size } });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForTimeout(1500);
    await scrollThrough(page, 250, 180);
    await page.waitForTimeout(600);

    await page.locator('#specialties [data-dept="Ngoại khoa"]').click();
    await expect(page.locator('#b-dept')).toHaveValue('Ngoại khoa');
    await page.waitForTimeout(900);

    const form = page.locator('#booking');
    await form.locator('[name=name]').pressSequentially('Trần Thị B', { delay: 60 });
    await form.locator('[name=phone]').pressSequentially('0912345678', { delay: 60 });
    await form.locator('[name=year]').pressSequentially('1990', { delay: 60 });

    let alertText = '';
    page.once('dialog', async (d) => { alertText = d.message(); await d.accept(); });
    await form.locator('button[type=submit]').click();
    await expect(form.locator('.form__msg')).toHaveText(MSG);
    expect(alertText).toBe(MSG);
    await page.waitForTimeout(1200);

    const video = page.video();
    await context.close();
    await video.saveAs('videos/demo.webm');
  });
});
