import { useState, useEffect, useCallback } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
  getContacts,
  getLoading,
  getError,
} from '../redux/contacts/contacts-selectors';

import * as operations from 'redux/contacts/contacts-operations';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import s from './app.module.css';

const App = () => {
  const contacts = useSelector(getContacts, shallowEqual);
  const loading = useSelector(getLoading, shallowEqual);
  const error = useSelector(getError, shallowEqual);
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    e => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const deleteContact = id => {
    dispatch(operations.deleteContact(id));
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
    dispatch(operations.addContact(props));
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm addContactBySubmit={addContactBySubmit} />
      <h2 className={s.title}>Contacts</h2>
      <Filter handleChange={handleChange} filter={filter} />
      {error && <p>Whoops...Please try later</p>}
      {loading && <p>Loading...</p>}
      {Boolean(contacts.length) && (
        <ContactList
          contacts={getFilteredContacts()}
          deleteContact={deleteContact}
        />
      )}
    </div>
  );
};

export default App;
