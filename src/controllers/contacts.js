import createHttpError from 'http-errors';
import * as contactServices from '../contacts/contact.js';
import * as contactServicesId from '../contacts/contactId.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';
import parseContactFilterParams from '../utils/filter/parseContactFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const { _id: userId } = req.user;

  const data = await contactServices.getContact({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getIdContactsController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServicesId.getContactById({ _id: id, userId });

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
  const { _id: userId } = req.user;
  let photoUrl = null;

  if (req.file) {
    photoUrl = await saveFileToCloudinary(req.file);
  }

  const data = await contactServicesId.createContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  let photoUrl = null;

  if (req.file) {
    photoUrl = await saveFileToCloudinary(req.file);
  }

  const { isNew, data } = await contactServices.updateContact(
    { _id: id, userId },
    { ...req.body, photo: photoUrl },
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
  const { _id: userId } = req.user;
  let photoUrl = null;

  if (req.file) {
    photoUrl = await saveFileToCloudinary(req.file);
  }

  const result = await contactServicesId.updateContact(
    { _id: id, userId },
    { ...req.body, photo: photoUrl },
    { new: true },
  );

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: {
      _id: result.data._id,
      name: result.data.name,
      phoneNumber: result.data.phoneNumber,
      email: result.data.email,
      isFavourite: result.data.isFavourite,
      contactType: result.data.contactType,
      userId: result.data.userId,
      photo: result.data.photo,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
    },
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServicesId.deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};
