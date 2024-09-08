import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(contactController.getAllContactsController));

contactRouter.get(
  '/:id',
  ctrlWrapper(contactController.getIdContactsController),
);

contactRouter.post('/', ctrlWrapper(contactController.addContactsController));

contactRouter.put(
  '/:id',
  ctrlWrapper(contactController.upsertContactController),
);

contactRouter.patch(
  '/:id',
  ctrlWrapper(contactController.patchContactController),
);

contactRouter.delete(
  '/:id',
  ctrlWrapper(contactController.deleteContactController),
);

export default contactRouter;
