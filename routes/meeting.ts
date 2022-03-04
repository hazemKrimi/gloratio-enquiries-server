// Packages
import express from 'express';

// Controllers
import { find, create, findOne } from '../controllers/meeting';

const meetingsRouter = express.Router();

meetingsRouter.get('/', async (_, res) => {
  try {
    res.json(await find());
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

meetingsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await findOne(id));
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

meetingsRouter.post('/', async (req, res) => {
  try {
    // @ts-ignore
    if (!req.user) throw new Error('Not authorized');

    // @ts-ignore
    const { role } = req.user;

    if (role === 'customer')
      throw new Error('A customer cannot create a meeting');

    return res.json(await create(req.body));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

export default meetingsRouter;
