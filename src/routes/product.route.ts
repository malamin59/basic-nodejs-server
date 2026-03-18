import { IncomingMessage, ServerResponse } from "http";

export const productRoute = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url; // 'root url
  const method = req.method; // METHOD

  if (method === "GET" && url === "/") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "the quick brown fox jumps over the lazy dog ",
      }),
    );
  }
  
  else if (url?.startsWith("/product")) {
    console.log("this is product route");
  }
  
  else {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Nothing here please check letter " }));
  }
};
