import ContactCollection from '../db/models/Contact.js';

export const updateContact = async (filter, data, options) => {
  const rawResult = await ContactCollection.findByIdAndUpdate(
    filter,
    data,
    (options = {
      includeResultMetadata: true,
      ...options,
    }),
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};
export const getContactById = (filter) => ContactCollection.findById(filter);
export const createContact = (payload) => ContactCollection.create(payload);
export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);

// findByIdAndUpdate
