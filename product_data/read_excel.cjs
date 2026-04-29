const xlsx = require('xlsx');

function readAndPrint(file) {
  console.log('--- ' + file + ' ---');
  try {
    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });
    console.log(JSON.stringify(data.slice(0, 10), null, 2)); // Print first 10 rows
    console.log('Total rows:', data.length);
  } catch (e) {
    console.error("Error reading file", e);
  }
}

readAndPrint('product_list_exc.xlsx');
readAndPrint('product_list_mas.xlsx');
