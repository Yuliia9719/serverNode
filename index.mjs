import http from 'http'
import { generateHtml, generateAbout, generateContact, generateNotFound, postData } from './api.mjs'
const PORT = 3000

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    return generateHtml(req, res)
  }
  if (req.method === 'GET' && req.url === '/about') {
    return generateAbout(req, res)
  }
  // GET contact
  if (req.method === 'GET' && req.url === '/contact') {
    return generateContact(req, res)
  }
  // POST contact
  if (req.method === 'POST' && req.url === '/contact') {
    return postData(req, res)
  }
  if (req.method === 'GET' && req.url !== '/contact' && req.url !== '/about' && req.url !== '/') {
    return generateNotFound(req, res)
  }
})

server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
