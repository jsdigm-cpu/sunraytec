const xlsx = require('xlsx');
const fs = require('fs');

function parseFile(file, productLine) {
  const workbook = xlsx.readFile(file);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { defval: "", header: 1 });
  
  const products = [];
  let currentProduct = null;
  
  for (let i = 2; i < data.length; i++) {
    const row = data[i];
    const modelMatch = String(row[1]).trim().match(/^(\d+)\s*\((.*)\)/);
    const hasNewModel = modelMatch !== null;
    
    if (hasNewModel || (String(row[1]).trim() !== "" && !currentProduct)) {
      if (currentProduct) products.push(currentProduct);
      
      let pId = String(row[1]).trim();
      let type = "embedded";
      if (pId.includes("노출형")) type = "exposed";
      else if (pId.includes("매립형")) type = "embedded";
      else if (pId.includes("벽걸이형")) type = "wall-mounted";
      
      pId = pId.replace(/\(.*\)/g, '').trim();
      
      let name = String(row[0]).trim();
      if (!name) name = `SUR-${pId}`; // fallback
      
      currentProduct = {
        name: name,
        procurementId: pId,
        productLine: productLine,
        installationType: type,
        applications: String(row[5] || "").split('\n').map(s=>s.trim().replace(/^- /,'')).filter(Boolean),
        specs: {
          powerW: 0,
          sizeMm: "",
          voltage: "",
          heatingArea: "",
          weightKg: 0,
          currentA: 0,
          calorificValueKcal: 0,
          heatingTempC: "",
        }
      };
    }
    
    if (currentProduct && row[2]) {
      const key = String(row[2]).trim();
      const val = row[4];
      
      if (key.includes("소비 전력")) currentProduct.specs.powerW = parseInt(String(val).replace(/,/g, '')) || 0;
      else if (key.includes("사이즈")) currentProduct.specs.sizeMm = String(val).trim();
      else if (key.includes("입력 전압")) currentProduct.specs.voltage = String(val).trim();
      else if (key.includes("난방 면적")) currentProduct.specs.heatingArea = String(val).trim();
      else if (key.includes("무게")) currentProduct.specs.weightKg = parseFloat(String(val)) || 0;
      else if (key.includes("정격 전류")) currentProduct.specs.currentA = parseFloat(String(val)) || 0;
      else if (key.includes("발열량")) currentProduct.specs.calorificValueKcal = parseInt(String(val).replace(/,/g, '')) || 0;
      else if (key.includes("발열 온도")) currentProduct.specs.heatingTempC = String(val).trim();
    }
  }
  
  if (currentProduct) products.push(currentProduct);
  return products;
}

const excProducts = parseFile('product_list_exc.xlsx', 'excellent');
const masProducts = parseFile('product_list_mas.xlsx', 'mas');

const allProducts = [...excProducts, ...masProducts];
fs.writeFileSync('../src/data/parsed_products.json', JSON.stringify(allProducts, null, 2));
console.log('Parsed products:', allProducts.length);
