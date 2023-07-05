import fs from "fs/promises";
import contacts from "./db/contacts.json";
import path from "path";
import {nanoid} from "nanoid";

const contactsPath = path.basename(contacts);

function listContacts() {
  // ...твій код. Повертає масив контактів.
  fs.readFile(contacts)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getContactById(contactId) {
  return fs.readFile(contacts).then((data) => {
    const result = data.find((item) => item.id === contactId);
    if (result.id !== contactId) {
      return null;
    }
    return result;
  });
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }
  const allContacts = await fs.readFile(contacts);
  const normilizeData = JSON.parse(allContacts.toString());
  const result = normilizeData.filter((item) => item.id !== contact.id);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return contact;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  await fs.appendFile(contacts, { name, email, phone }.toString());
  return {
    id: nanoid(),
    name,
    email,
    phone,
  };
  // ...твій код. Повертає об'єкт доданого контакту.
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
