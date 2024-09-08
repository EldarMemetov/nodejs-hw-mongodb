import createHttpError from 'http-errors';
import * as contactServices from '../contacts/contact.js';
import * as contactServicesId from '../contacts/contactId.js';

export const getAllContactsController = async (req, res) => {
  const data = await contactServices.getAllContact();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getIdContactsController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServicesId.getContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: `Contact ${id}`,
    data,
  });
};

export const addContactsController = async (req, res) => {
  const data = await contactServices.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await contactServices.updateContact(
    { _id: id },
    req.body,
    {
      upsert: true,
    },
  );
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.updateContact({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.deleteContact({ _id: id });
  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.status(204).send();
};
