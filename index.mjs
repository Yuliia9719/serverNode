import { createServer } from "node:http";
import {
  generateForm,
  generateHtml,
  generateJson,
  generateNotFound,
  generateAbout,
  generateContacts,
  postData
} from "./api.mjs";

const PORT = 3000;

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") return generateHtml(req, res);

  if (req.method === "GET" && req.url === "/about")
    return generateAbout(req, res);

  if (req.method === "GET" && req.url === "/json")
    return generateJson(req, res);

  // GET /todos
  if (req.method === "GET" && req.url === "/contacts")
    return generateContacts(req, res);
  // POST /todos
  if (req.method === "POST" && req.url === "/contacts")
    return postData(req, res);

  if (req.method === "GET" && req.url === "/form")
    return generateForm(req, res);

  generateNotFound(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
