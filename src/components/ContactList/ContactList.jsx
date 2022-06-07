import PropTypes from 'prop-types';

import s from './contactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  const elements = contacts.map(({ name, number, id }) => (
    <li key={id} className={s.item}>
      <p className={s.info}>
        {name}: {number}
      </p>
      <button className={s.btn} type="button" onClick={() => deleteContact(id)}>
        X
      </button>
    </li>
  ));
  return <ul className={s.list}>{elements}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
