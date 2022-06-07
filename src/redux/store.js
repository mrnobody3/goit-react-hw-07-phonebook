import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './contacts/contacts-slice';

const store = configureStore({
  reducer: contactsReducer,
});

export default store;
