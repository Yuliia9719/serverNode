import {
  formTemplate,
  generateContactsTemplate,
  notFoundHtmlTemplate,
  rootHtmlTemplate,
  contacts,
  createHtmlTemplate
} from './data.mjs'
import * as querystring from 'node:querystring'

const generateHtml = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(rootHtmlTemplate)
}

const generateAbout = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Plain text from HTTP server')
}

const generateContacts = (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(generateContactsTemplate())
}

const generateJson = (req, res) => {
  res.statusCode = 200

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(contacts))
}

const generateForm = (req, res) => {
  if (!formTemplate) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('Error: Form template not loaded')
  } else {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(createHtmlTemplate(formTemplate))
  }
}

const postData = (req, res) => {
  res.setHeader('Content-Type', 'text/plain')

  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = ''

    req.on('data', (chunk) => (body += chunk))

    req.on('end', () => {
      try {
        let contact = querystring.parse(body)

        contact = {
          id: +contact['id'],
          name: contact['name'],
          completed: contact['completed'] === 'on'
        }

        contacts.push(contact)

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(generateContactsTemplate())
      } catch (error) {
        res.statusCode = 400
        res.end('Invalid form data')
      }
    })
  } else if (req.headers['content-type'] === 'application/json') {
    let dataJson = ''

    req.on('data', (chunk) => (dataJson += chunk))

    req.on('end', () => {
      try {
        contacts.push(JSON.parse(dataJson))
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

export { generateHtml, generateAbout, generateJson, generateNotFound, generateForm, generateContacts, postData }
