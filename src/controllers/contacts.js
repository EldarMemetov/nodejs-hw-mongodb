import createHttpError from 'http-errors';
import * as contactServices from '../contacts/contact.js';
import * as contactServicesId from '../contacts/contactId.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';

import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';

import parseContactFilterParams from '../utils/filter/parseContactFilterParams.js';

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const data = await contactServices.getContact({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter,
  });
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
  const result = await contactServicesId.updateContact({ _id: id }, req.body);

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
  const data = await contactServicesId.deleteContact({ _id: id });
  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.status(204).send();
};
