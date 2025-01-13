const { test, expect } = require("@playwright/test");

test("Browser Context - First PM test", async ({ browser }) => {
  // chrome _ plugins / cookies (contexte pour ouvrir un navigateur)
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const page_title = await page.title();
  await expect(page).toHaveTitle(page_title);
  // locator with css-id
  const username = page.locator("#username");
  const pw = page.locator('[type="password"]');
  await username.fill("rahulshetty");
  // await page.locator('#password').fill('12345');
  await pw.fill("learning");
  await page.locator("#signInBtn").click();
  // alerte d'erreur (auto-waiting)
  const alerte_message = await page.locator('[style*="block"]').textContent();
  console.log(alerte_message);
  await expect(page.locator('[style*="block"]')).toContainText(alerte_message);

  await username.fill("rahulshettyacademy");
  await pw.fill("learning");
  await page.locator("#signInBtn").click();
  // console.log(await page.locator('.card-body').getByText('iphone X').textContent());
  console.log(await page.locator(".card-body a").nth(0).textContent());
  const element_card_title = page.locator(".card-body a");
  // await expect(first_element).toContainText('iphone X');
  const all_titles_elements = await element_card_title.allTextContents();
  console.log(all_titles_elements);
});

test("Page Fixture - First PM test", async ({ page }) => {
  await page.goto("https://google.com");
  await expect(page).toHaveTitle("Google");
});

test("child windows handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const locator_link = page.getByRole("link", {
    name: "Free Access to InterviewQues/ResumeAssistance/Material",
  });
  // before click a blank link ;;; must tell playwright that a page will be displayed
  // switch to the new context for the second page
  const [page_2] = await Promise.all([
    context.waitForEvent("page"), // listen for any new page - don't use wait to make 2steps playing in parallel
    await locator_link.click(),
  ]);
  await expect(page_2).toHaveURL(
    "https://rahulshettyacademy.com/documents-request"
  );
  const red_parag = await page_2
    .locator(".red")
    .getByRole("link")
    .textContent();
  await page_2.close();
  const domain = red_parag.split("@");
  await page.locator("#username").fill(domain[1]);
});

test("radio button test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  const locator_link = page.getByRole("link", {
    name: "Free Access to InterviewQues/ResumeAssistance/Material",
  });
  await expect(locator_link).toHaveAttribute("class", "blinkingText");

  await page.locator("#username").fill("anshika@gmail.com");
  await page.locator("#password").fill("Iamking@000");
  await page.locator("select.form-control").first().selectOption("Consultant");
  await page.pause(); // to make pause
  await page.getByRole("radio", { name: "User" }).check();
  await page.locator("#okayBtn").click();
  await page.locator("#terms").check();

  await expect(page.getByRole("radio", { name: "User" })).toBeChecked();
  await expect(page.locator("select.form-control").first()).toHaveValue(
    "consult"
  );
  // await expect(page.locator("#terms")).toBeChecked(); // we can use
  expect(await page.locator("#terms").isChecked()).toBeTruthy();
});
