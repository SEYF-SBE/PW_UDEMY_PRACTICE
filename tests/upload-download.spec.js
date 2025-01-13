const ExcelJs = require("exceljs"); // class : ExcelJs
const { test, expect } = require("@playwright/test");

async function writeExcel(
  searchText,
  replaceText,
  change,
  filePath,
  sheetName
) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  const output = await readExcel(worksheet, searchText);
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, columnNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = columnNumber;
      }
    });
  });
  return output;
}

// writeExcel(
//   "Papaya",
//   "Samsung",
//   { rowChange: 0, colChange: 0 },
//   "exceldownload.xlsx",
//   "Sheet1"
// ); // when i find the search text "Papaya", i change cell in rowChange and colChange

test("Upload download Excel validation", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  // wait to be sure that the file is correctly downloaded
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#downloadButton").click();
  await downloadPromise;
  await writeExcel(
    "Mango",
    999,
    { rowChange: 0, colChange: 2 },
    "C:/Users/Utilisateur 1/Downloads/download.xlsx",
    "Sheet1"
  );
  await page
    .locator("#fileinput")
    .setInputFiles("C:/Users/Utilisateur 1/Downloads/download.xlsx"); // il faut avoir le type=file sur la balise de l'input
  await expect(
    page.getByRole("row").filter({ has: page.getByText("Mango") })
  ).toContainText("999");
});
