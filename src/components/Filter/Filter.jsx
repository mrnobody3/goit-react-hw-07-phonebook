import { memo } from 'react';
import PropTypes from 'prop-types';

import s from './filter.module.css';

const Filter = ({ handleChange, filter }) => {
  return (
    <div>
      <label className={s.name} htmlFor="">
        Find contacts by name:{' '}
      </label>
      <input
        type="text"
        value={filter}
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
    </div>
  );
};

export default memo(Filter);

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
