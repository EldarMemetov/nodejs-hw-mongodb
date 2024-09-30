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
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

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
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.addContactsController),
);

contactRouter.put(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.upsertContactController),
);

contactRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactController.patchContactController),
);

contactRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.deleteContactController),
);

export default contactRouter;
