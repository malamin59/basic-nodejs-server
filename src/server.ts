import { createServer, Server } from "http";
import { productRoute } from "./routes/product.route";

const server: Server = createServer((req, res) => {
  productRoute(req, res);
});

// listen the server
server.listen(5000, () => {
  console.log("Server Running on Port on 5000");
});
