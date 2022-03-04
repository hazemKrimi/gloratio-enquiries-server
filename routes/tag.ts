// Packages
import express from 'express';

// Controllers
import { find, create, remove, findOne } from '../controllers/tag';

const tagRouter = express.Router();

tagRouter.get('/', async (_, res) => {
  try {
    res.json(await find());
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

tagRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await findOne(id));
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

tagRouter.post('/', async (req, res) => {
  try {
    // @ts-ignore
    if (!req.user) throw new Error('Not authorized');

    // @ts-ignore
    const { role } = req.user;

    if (role === 'customer') throw new Error('A customer cannot create a tag');

    return res.json(await create(req.body));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

tagRouter.delete('/:id', async (req, res) => {
  try {
    // @ts-ignore
    if (!req.user) throw new Error('Not authorized');

    // @ts-ignore
    const { role } = req.user;

    if (role === 'customer') throw new Error('A customer cannot delete a tag');

    const { id } = req.params;

    return res.json(await remove(id));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

export default tagRouter;
