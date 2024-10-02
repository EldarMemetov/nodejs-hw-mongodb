import ContactCollection from '../db/models/Contact.js';

export const updateContact = async (filter, data, options = {}) => {
  const updatedContact = await ContactCollection.findOneAndUpdate(
    { _id: filter._id, userId: filter.userId },
    data,
    {
      new: true,
      ...options,
    },
  );

  if (!updatedContact) return null;

  return {
    data: updatedContact,
    isNew: false,
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
