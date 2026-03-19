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
    try {
      const products = readProduct();
      return sendResponse(
        res,
        200,
        true,
        "Product retrived  Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 200, false, "sometingn wrong" , error);
    }
  }
  
  /* GET ROUTE */
else if (method === "GET" && id !== null) {
  try {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      return sendResponse(res, 404, false, "Product not found", null);
    }

    return sendResponse(
      res,
      200,
      true,
      "Product retrieved successfully",
      product
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Something went wrong", error);
  }
}

  /* POST ROUTE */  
  else if (method === "POST" && url === "/products") {
  try {
    const body = await parseBody(req);
    const products = readProduct();

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);
    writeProduct(products);

    return sendResponse(
      res,
      201,
      true,
      "Product created successfully",
      newProduct
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Something went wrong", error);
  }
}

  /* PUT METHOD */  
 else if (method === "PUT" && id !== null) {
  try {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found", null);
    }

    products[index] = { id: products[index].id, ...body };
    writeProduct(products);

    return sendResponse(
      res,
      200,
      true,
      "Product updated successfully",
      products[index]
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Something went wrong", error);
  }
}

  /// delete
  else if (method === "DELETE" && id !== null) {
  try {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found", null);
    }

    const deletedProduct = products[index];

    products.splice(index, 1);
    writeProduct(products);

    return sendResponse(
      res,
      200,
      true,
      "Product deleted successfully",
      deletedProduct
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Something went wrong", error);
  }
}
};
