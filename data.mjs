import fs from "node:fs/promises";

const createHtmlTemplate = (htmlInjection) => `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTTP server</title>
      </head>
      
      <body style="font-family: Arial, Helvetica, sans-serif;">
        <div style="width: min(100% - 40px, 992px); margin-inline: auto;">
          ${htmlInjection}
        </div>
      </body>
      
      </html>
    `;

const rootHtmlTemplate = createHtmlTemplate("<h1>Hello from HTTP server</h1>");

const notFoundHtmlTemplate = createHtmlTemplate("<h1>404 Page Not Found</h1>");

const aboutHtmlTemplate = createHtmlTemplate("<h1>About page</h1>");

const generateContactsTemplate = () => {
  const headerHtml = `<h1>Contacts List</h1>`;
  const contactsHtml = contacts
    .map(
      (contact) => `
        <div style="border-bottom: 1px solid #ccc; padding: 10px;">
          <p>Id: ${contact.id}</p>
          <p>User name: ${contact.userName}</p>
          <p>Completed: ${contact.completed ? "Yes" : "No"}</p>
        </div>
      `
    )
    .join("");

  const buttonHtml = `<button onclick="location.href='/form'">Add new contact</button>`;

  return createHtmlTemplate(`${headerHtml}${contactsHtml}${buttonHtml}`);
};

let formTemplate;

const loadFormTemplate = async () => {
  try {
    formTemplate = await fs.readFile("./templates/form.html");
  } catch (error) {
    console.error("Error reading form.html file:", error);
  }
};

loadFormTemplate();

const contacts = [
  {
    id: 1,
    userName: "John"
  },
  {
    id: 2,
    userName: "Jane"
  },
  {
    id: 3,
    userName: "Bob"
  },
  {
    id: 4,
    userName: "Alice"
  },
  {
    id: 5,
    userName: "Charlie"
  }
];

export {
  rootHtmlTemplate,
  notFoundHtmlTemplate,
  aboutHtmlTemplate,
  contacts,
  formTemplate,
  generateContactsTemplate
};
