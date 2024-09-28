import ContactCollection from '../db/models/Contact.js';

export const updateContact = async (filter, data, options) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: filter._id, userId: filter.userId },
    data,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    data: rawResult,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};

export const getContactById = (filter) =>
  ContactCollection.findOne({ _id: filter._id, userId: filter.userId });

export const createContact = (payload) => ContactCollection.create(payload);

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete({
    _id: filter._id,
    userId: filter.userId,
  });
