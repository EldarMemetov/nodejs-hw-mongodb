import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import * as contactServices from './contacts/contact.js';
import * as contactServicesId from './contacts/contactId.js';

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getAllContact();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contactServicesId.getContactById(id);

    if (!data) {
      return res.status(404).json({
        message: `Contact with id=${id} not found`,
      });
    }
    res.json({
      status: 200,
      message: `Contact ${id}`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} Not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log('Server running on port 3000'));
};
