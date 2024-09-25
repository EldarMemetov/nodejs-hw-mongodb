import { Router } from 'express';

import validateBody from '../utils/validateBody.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import * as authControllers from '../controllers/auth.js';

import { userSigninSchema, userSignupSchema } from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);

authRouter.post(
  '/signin',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));

authRouter.post('/signup', ctrlWrapper(authControllers.signoutController));

export default authRouter;
