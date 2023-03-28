import React, { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Layout } from "./Layout";

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const saveContacts = localStorage.getItem('contacts');
    if (saveContacts) {
      const parsedContacts = JSON.parse(saveContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.contacts !== this.state.contacts) { 
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const findName = newContact.name.toLowerCase();
    if (this.state.contacts.find(({ name }) => name.toLowerCase() === findName)) {
      alert(`${newContact.name} is already in contacts`);
      return
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact]
      }
    })
  }

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      }
    })
  }

  onFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilter = () => {
    const filter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  
  render() {
    const { getFilter, deleteContact, onFilter, addContact } = this;
    const filtredContacts = getFilter();
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={onFilter} />
        <ContactList contacts={filtredContacts} onDelete={deleteContact} />
      </Layout>
    )
  }
}