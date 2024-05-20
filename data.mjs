import fs from 'node:fs/promises'
const createHtmlTemplate = (htmlInjection) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTTP Server</title>
</head>
<body style='font-family: monospace'>
<div style='width: min(100% - 40px, 992px); margin-inline: auto;'>
  ${htmlInjection}
</div>
  
</body>
</html>`

const rootHtmlTemplate = createHtmlTemplate('<h1>Hello from ROOT PAGE</h1>')

const notFoundHtmlTemplate = createHtmlTemplate('<h1>404 PAGE NOT FOUND</h1>')

const aboutHtmlTemplate = createHtmlTemplate('<h1>Hello from ABOUT PAGE</h1>')

const contact = [
  {
    username: 'Bret',
    email: 'lC0XK@example.com'
  },
  {
    username: 'Antonette',
    email: 'p0qFP@example.com'
  },
  {
    username: 'Samantha',
    email: 'p0qFP@example.com'
  },
  {
    username: 'Karianne',
    email: 'p0qFP@example.com'
  }
]

export { rootHtmlTemplate, contact, notFoundHtmlTemplate, aboutHtmlTemplate }
