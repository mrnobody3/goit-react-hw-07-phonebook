import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './contactForm.module.css';

const ContactForm = ({ addContactBySubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContactBySubmit(state);
    setState({ name: '', number: '' });
  };
  const { name, number } = state;
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.item} htmlFor="">
        Name
      </label>
      <input
        className={s.item}
        type="text"
        value={name}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />

      <label className={s.item} htmlFor="">
        Number
      </label>
      <input
        className={s.item}
        type="tel"
        value={number}
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />
      <button className={`${s.item} ${s.btn}`} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContactBySubmit: PropTypes.func.isRequired,
};
