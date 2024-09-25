import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../db/models/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import authenticate from '../middlewares/authenticate.js';
const contactRouter = Router();
contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(contactController.getAllContactsController));

contactRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.getIdContactsController),
);

contactRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.addContactsController),
);

contactRouter.put(
  '/:id',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.upsertContactController),
);

contactRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactController.patchContactController),
);

contactRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.deleteContactController),
);

export default contactRouter;
