// Packages
import express from 'express';

// Controllers
import {
  create,
  find,
  findByCustomer,
  findOne,
  reply,
  tag,
} from '../controllers/query';

const queriesRouter = express.Router();

queriesRouter.get('/', async (_, res) => {
  try {
    res.json(await find());
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

queriesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await findOne(id));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

queriesRouter.get('/customer/:id', async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await findByCustomer(id));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

queriesRouter.post('/', async (req, res) => {
  try {
    // @ts-ignore
    if (!req.user) throw new Error('Not authorized');

    // @ts-ignore
    const { id, role } = req.user;

    if (role !== 'customer')
      throw new Error('Only a customer can create a query');

    res.json(await create(id, req.body));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

queriesRouter.put('/:id/reply', async (req, res) => {
  try {
    // @ts-ignore
    if (!req.user) throw new Error('Not authorized');

    // @ts-ignore
    const { id: userId } = req.user;
    const { id: queryId } = req.params;
    const { content } = req.body;

    res.json(await reply(queryId, userId, content));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

queriesRouter.put('/:id/tag', async (req, res) => {
  try {
    // @ts-ignore
    if (!req.user) throw new Error('Not authorized');

    // @ts-ignore
    const { role } = req.user;

    if (role === 'customer') throw new Error('A customer can not tag a query');

    const { id: queryId } = req.params;
    const { tags } = req.body;

    res.json(await tag(queryId, tags));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

export default queriesRouter;
