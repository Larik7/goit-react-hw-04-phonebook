import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Layout } from "./Layout";

const getContact = () => {
  const saveContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(saveContacts);
  return parsedContacts ? parsedContacts : [];
  
};

export const App = () => {
  const [contacts, setContacts] = useState(getContact);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = newContact => {
    const findName = newContact.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === findName)) {
      alert(`${newContact.name} is already in contacts`);
      return
    }

    setContacts(prevState => [...prevState.contacts, newContact]);
  }

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  }

  const onFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilter = () => {
    const clearFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(clearFilter)
    );
  };
  
  const filtredContacts = getFilter();

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilter} />
      <ContactList contacts={filtredContacts} onDelete={deleteContact} />
    </Layout>
  )
  
}