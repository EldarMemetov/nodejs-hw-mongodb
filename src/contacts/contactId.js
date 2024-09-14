import ContactCollection from '../db/models/Contact.js';

export const getContactById = (id) => ContactCollection.findById(id);

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

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
