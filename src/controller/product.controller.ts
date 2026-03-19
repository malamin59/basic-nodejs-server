import { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../services/product.service";
import { IProduct } from "../types/product.interface";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  console.log("come in at 10 number line", url);
  const method = req.method;
  const urlPart = url?.split("/");
  console.log("Coming at 13 number line", urlPart);
  const id = urlPart && urlPart[1] === "products" ? Number(urlPart[2]) : null;
  console.log("Coming at 15 number line", id);
  if (method === "GET" && url === "/products") {
    const products = readProduct();
    return sendResponse(res, true, 200 , "Product retrived  Successfully" , products)
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Product created", data: product }));
    return;
  } else if (method === "POST" && "/products") {
    /* CREATE A POST METHOD */
    const body = await parseBody(req);
    const products = readProduct();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    writeProduct(products);
    return;
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    console.log("body is here --->", body);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    console.log("index Number is here --->", index);
    if (index < 0) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not found " }));
      return;
    }
    products[index] = { id: products[index].id, ...body };
    writeProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "Product Updated", data: products[index] }),
    );
    return;
  }

  /// delete
  else if (method === "PUT" && id !== id) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(201, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not Found!!",
        }),
      );
      return;
    }
    products.splice(index, 1);
    writeProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Deleted  Successfully!!"
      }),
    );
    return;
  }
};
