import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://629da4e6c6ef9335c0a1e641.mockapi.io/api/v1/contacts',
});

export const getContacts = async () => {
  const { data } = await instance.get('/');

  return data;
};

export const addContact = async data => {
  const { data: result } = await instance.post('/', data);
  return result;
};

export const removeContact = async id => {
  const { data } = await instance.delete(`/${id}`);
  return data;
};
