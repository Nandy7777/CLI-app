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

async function getContactById(contactId) {
    const db = await readDb();
    const updatedDb = db.find((contact) => contact.id === String(contactId));
    await writeDb(updatedDb);
    console.log(updatedDb);
}

async function removeContact(contactId) {
    const db = await readDb();
    const updatedDb = db.filter((contact) => contact.id !== String(contactId));
    console.log(updatedDb);
    await writeDb(updatedDb);
}

async function addContact(name, email, phone) {
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const db = await readDb();
    db.push(newContact);
    console.log(newContact);
    await writeDb(db);
}

module.exports = {
  addContact,
  listContacts,
  removeContact,
  getContactById,
};