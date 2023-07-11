import fs from "fs/promises";
import path from "path";
import {nanoid} from "nanoid";


const contactsPath = path.resolve('db/contacts.json');
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  await fs
    .readFile(contactsPath)
    .then((data) => {
      console.table(JSON.parse(data.toString()));
    })
    .catch((error) => {
      console.log(error);
    });
}

function getContactById(contactId) {
  return fs.readFile(contactsPath).then((data) => {
    const result = JSON.parse(data).find((item) => item.id === contactId);
    if (!result) {
      return console.log(null);
    }
    return console.log(result);
  });
}

async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  if (!contact) {
    return console.log(null);
  }
  const allContacts = await fs.readFile(contactsPath);
  const normilizeData = JSON.parse(allContacts.toString());
  const result = normilizeData.filter((item) => item.id !== contact.id);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return console.log(contact);
}

async function addContact(name, email, phone) {
  const allContacts = await fs.readFile(contactsPath);
  const normilizeData = JSON.parse(allContacts.toString());
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const result = normilizeData.find((item) => item.id === contact.id);
  if(result){
    return console.log('This id is true')
  }
  normilizeData.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(normilizeData));
  return console.log(contact);
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};


