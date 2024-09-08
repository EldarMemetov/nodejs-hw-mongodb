import ContactCollection from '../db/models/Contact.js';

export const getAllContact = () => ContactCollection.find();

export const createContact = (payload) => ContactCollection.create(payload);
