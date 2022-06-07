import { createAsyncThunk } from '@reduxjs/toolkit';

import * as API from 'services/contactsApi';

export const fetchContacts = createAsyncThunk(
  'contact/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.getContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addContact = createAsyncThunk(
  'contact/add',
  async (data, { rejectWithValue }) => {
    try {
      const newContact = await API.addContact(data);
      return newContact;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const contacts = getState();
      const duplicate = contacts.items.find(item => item.name === data.name);
      if (duplicate) {
        alert(`${data.name} is already in phonebook`);
        return false;
      }
      return data;
    },
  }
);
export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { id: deleteId } = await API.removeContact(id);
      return deleteId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
