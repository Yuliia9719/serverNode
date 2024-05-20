import { contact, rootHtmlTemplate, notFoundHtmlTemplate, aboutHtmlTemplate } from './data.mjs'
const generateHtml = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(rootHtmlTemplate)
}

const generateAbout = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(aboutHtmlTemplate)
}

const generateContact = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(contact))
}

const postData = (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  if (req.headers['content-type'] == 'application/json') {
    let dataJson = ''
    req.on('data', (chunk) => (dataJson += chunk))

    req.on('end', () => {
      try {
        contact.push(JSON.parse(dataJson))
        res.statusCode = 200
        res.end('Contact data was received')
      } catch (error) {
        res.statusCode = 400
        res.end('Invalid JSON data')
      }
    })
  } else {
    res.statusCode = 400
    res.end('Contact data must be in JSON format')
  }
}

const generateNotFound = (req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/html')
  res.end(notFoundHtmlTemplate)
}

export { generateHtml, generateAbout, generateContact, generateNotFound, postData }
