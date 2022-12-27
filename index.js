const { addContact, removeContact, listContacts } = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case 'list':
          const contacts = await listContacts();
          console.table(contacts);
          break;
      case 'get':
          await getContactById(id);
          break;
      case 'add':
          await addContact(name, email, phone);
          break;
      case 'remove':
          await removeContact(id);
          break;
      default:
          console.warn('\x1B[31m Unknown action type!');
  }
}
// invokeAction({ action: 'remove', id: '10'});
// invokeAction({ action: 'add', name: 'some name', email: 'some email', phone: 'some phone' + new Date () });
invokeAction(argv);
// invokeAction({ action: 'list' });