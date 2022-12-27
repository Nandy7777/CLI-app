const path = require('path');
const fs = require('fs').promises;
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, './db/contacts.json');

async function readDb() {
    const dbRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(dbRaw);
    return db;
}

async function writeDb(db) {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
    const db = await readDb();
    return db;
}

function getContactById(contactId) {
  // ...твій код
}

async function removeContact(contactId) {
    const db = await readDb();
    const updatedDb = db.filter((contact) => contact.id === contactId);

    await writeDb(updatedDb);
}

async function addContact(name, email, phone) {
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const db = await readDb();
    db.push(newContact);
    
    await writeDb(db);
}

module.exports = {
  addContact,
  listContacts,
  removeContact,
  getContactById,
};