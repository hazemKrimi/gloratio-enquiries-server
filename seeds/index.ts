// Seed
import userSeed from './users.json';

// Controllers
import { create } from '../controllers/user';

// Types
import { UserInput } from '../types/user';

export const seed = async () => {
  await Promise.all(
    userSeed.users.map(async (user) => {
      await create(user as UserInput);

      console.log(`Created user with email ${user.email}`);
    })
  );
};
