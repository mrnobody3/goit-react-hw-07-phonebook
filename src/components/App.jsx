import { useState, useCallback } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { getContacts } from '../redux/contacts/contacts-selectors';
import { actions } from '../redux/contacts/contacts-slice';

import s from './app.module.css';

const App = () => {
  const contacts = useSelector(getContacts, shallowEqual);
  console.log(contacts);

  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');

  const handleChange = useCallback(
    e => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const deleteContact = id => {
    const action = actions.removeContact(id);
    dispatch(action);
  };

  const getFilteredContacts = useCallback(() => {
    if (!filter) {
      return contacts;
    }
    const filterToLover = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const result = name.toLowerCase().includes(filterToLover);
      return result;
    });
    return filteredContacts;
  }, [contacts, filter]);

  const addContactBySubmit = props => {
    const duplicate = contacts.find(contact => contact.name === props.name);
    if (duplicate) {
      alert(`${props.name} is already in books list`);
      return;
    }

    const action = actions.addContact(props);
    dispatch(action);
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm addContactBySubmit={addContactBySubmit} />
      <h2 className={s.title}>Contacts</h2>
      <Filter handleChange={handleChange} filter={filter} />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
