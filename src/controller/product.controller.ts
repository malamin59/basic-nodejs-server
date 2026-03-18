import { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";
import { IProduct } from "../types/product.interface";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  console.log("come in at 10 number line",url)
  const method = req.method;  
  const urlPart = url?.split('/');
  console.log("Coming at 13 number line",urlPart)
  const id = urlPart && urlPart[1] === 'products' ?  Number(urlPart[2]) : null
  console.log("Coming at 15 number line" ,id)
  if (method === "GET" && url === "/products") {
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "THIS IS PRODUCT ROUTE", data: products }),
    );
  } 

  else if (method === 'GET' && id !== null) {
    const products = readProduct();
    const product = products.find((p : IProduct ) => p.id === id)
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "THIS IS PRODUCT ROUTE", data: product }),
    );
  } 
/* CREATE A POST METHOD */
else if (method === 'POST' && '/products') {
    const body = req
}
};
