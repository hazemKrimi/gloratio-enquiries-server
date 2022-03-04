// Packages
import express from 'express';

// Controllers
import {
  find,
  create,
  update,
  remove,
  findOne,
  login,
} from '../controllers/user';

const usersRouter = express.Router();

usersRouter.get('/', async (_, res) => {
  try {
    res.json(await find());
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await findOne(id));
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    // @ts-ignore
    if (!req.user) throw new Error('Not authorized');

    // @ts-ignore
    const { role } = req.user;

    if (role !== 'admin') throw new Error('Only an admin can create a user');

    return res.json(await create(req.body));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

usersRouter.post('/signup', async (req, res) => {
  try {
    delete req.body?.role;

    return res.json(await create(req.body));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    return res.json(await login(email, password));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    // @ts-ignore
    const { id, role } = req.user;
    const { id: userToUpdateId } = req.params;

    if (id !== userToUpdateId && role !== 'admin')
      throw new Error('Only an admin can edit other users');

    return res.json(await update(userToUpdateId, req.body));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    // @ts-ignore
    const { id, role } = req.user;
    const { id: userToDelete } = req.params;

    if (id !== userToDelete && role !== 'admin')
      throw new Error('Only an admin can delete other users');

    return res.json(await remove(userToDelete));
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err: err.message });
  }
});

export default usersRouter;
