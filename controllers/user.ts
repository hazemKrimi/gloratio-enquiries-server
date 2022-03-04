// Packages
import { sign } from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt';

// Models
import { User, UserModel } from '../models/User';

// Types
import { UserInput, UserUpdateInput } from '../types/user';

export const find = async () => {
  return await UserModel.find();
};

export const findOne = async (id: string) => {
  return await UserModel.findOne({ _id: id });
};

export const create = async (
  body: UserInput
): Promise<{ user: User; token: string }> => {
  const { email, password } = body;

  const userExist = await UserModel.findOne({ email });

  if (!!userExist) throw new Error('User already exists');

  const salt = await genSalt(10);
  const passwordHash = await hash(password, salt);

  const user = await UserModel.create({
    ...body,
    role: body.role ?? 'customer',
    password: passwordHash,
  });

  const token = sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string
  );

  await user.save();

  return { user, token };
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User does not exist');

  const match = await compare(password, user.password as string);

  if (!match) throw new Error('Incorrect password');

  const token = sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string
  );

  return { user, token };
};

export const update = async (
  id: string,
  body: UserUpdateInput
): Promise<User> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    country,
    zip,
    password,
  } = body;

  const user = await UserModel.findOne({ _id: id });

  if (!user) throw new Error('User already exists');

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (zip) user.zip = zip;

  if (password) {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    user.password = passwordHash;
  }

  await user.save();

  return user;
};

export const remove = async (id: string): Promise<User> => {
  const user = await UserModel.findOne({ _id: id });

  if (!user) throw new Error('User does not exist');

  await UserModel.deleteOne({ _id: user.id });

  return user;
};
