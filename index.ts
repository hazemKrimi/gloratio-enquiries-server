// Environment variables loading
require('dotenv').config();

// Packages
import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';

// Routers
import usersRouter from './routes/user';
import queriesRouter from './routes/query';
import tagsRouter from './routes/tag';
import meetingsRouter from './routes/meeting';

// Controllers
import { find } from './controllers/user';

// Seed
import { seed } from './seeds';
import { auth } from './middleware/auth';

const PORT = process.env.PORT ?? 5000;
const app = express();

(async () => {
  // Connect to MongoDB database
  await connect('mongodb://localhost:27017/gloartio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const existantUsers = await find();

  if (process.env.SEED && existantUsers.length === 0) {
    await seed();
  }

  // Necessary middleware
  app.use(cors());
  app.use(express.json());

  // Auth middleware
  app.use(auth);

  // Routers middleware
  app.use('/users', usersRouter);
  app.use('/queries', queriesRouter);
  app.use('/tags', tagsRouter);
  app.use('/meetings', meetingsRouter);

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})();
