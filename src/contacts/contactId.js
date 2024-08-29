import ContactCollection from '../db/models/Contact.js';

export const getContactById = (id) => ContactCollection.findById(id);
