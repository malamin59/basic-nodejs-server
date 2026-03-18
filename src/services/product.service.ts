import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/database/database.json");

export function readProduct() {
  const data = fs.readFileSync(filePath, 'utf-8');
//   console.log(data.toString());
// console.log(data)
return JSON.parse(data)
}

