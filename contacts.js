const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db/contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async id => {
  const contacts = await listContacts()
  const contact = contacts.find(item => item.id === id)
  if (!contact) {
    return null
  }
  return contact
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const removeContact = async id => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  const newContacts = contacts.filter((_, index) => index !== idx)
  await updateContacts(newContacts)
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContacts,
  removeContact,
}
