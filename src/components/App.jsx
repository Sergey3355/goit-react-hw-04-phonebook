
import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import Container from "./Container";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";


  const App = () => { 
  const [contacts, setContacts] = useState(() =>{
  return JSON.parse(localStorage.getItem('contacts')) ?? [];
});

  useEffect(() =>{
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
    
  const [filter, setFilter]= useState('')

  const addContact = ( name, number ) => {
        const contact = {
            id: nanoid(),
            name,
            number
        };

  if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert("Enter the contact's name and number phone!");
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      alert('Enter the correct number phone!');
    } else {
      setContacts(prevContacts =>
        [contact, ...prevContacts].sort((a, b)=>{
          if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          return 0;
        }),
      );
    }
  };

   const deleteContact = contactId => {
       setContacts(contacts.filter(({id}) => id !== contactId))
    }

    const changeFilter = e => {
    setFilter( e.currentTarget.value );
     };
    
    const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) =>
    name.toLowerCase().includes(normalizedFilter),
    );
  };
  
   
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChange={changeFilter} />
        )}
        {contacts.length > 0 ? (
          <ContactList
            contacts={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        ) : (
          <p>Your phonebook is empty. Please add contact.</p>
        )}
      </Container>
    );
  }


export default App