// Packages
import omit from 'lodash.omit';

// Models
import { QueryModel } from '../models/Query';
import { ReplyModel } from '../models/Reply';
import { Tag, TagModel } from '../models/Tag';
import { UserModel } from '../models/User';

// Types
import { QueryInput } from '../types/query';

export const find = async () => {
  return await QueryModel.find();
};

export const findOne = async (id: string) => {
  return await QueryModel.findOne({ _id: id });
};

export const findByCustomer = async (id: string) => {
  return await QueryModel.find({ customerId: id });
};

export const create = async (customerId: string, body: QueryInput) => {
  const customer = await UserModel.findOne({ _id: customerId });

  if (!customer) throw new Error('User does not exist');

  const query = await QueryModel.create({
    customerId,
    customer,
    ...body,
  });

  customer.queries = [...(customer.queries ?? []), query];

  await query.save();
  await customer.save();

  return query;
};

export const reply = async (
  queryId: string,
  userId: string,
  content: string
) => {
  const user = await UserModel.findOne({ _id: userId });

  if (!user) throw new Error('User does not exist');

  const query = await QueryModel.findOne({
    _id: queryId,
  });

  if (!query) throw new Error('Query does not exist');

  const reply = await ReplyModel.create({
    content,
    by: omit(user, ['password', 'queries']),
  });

  query.replies = [...(query.replies ?? []), reply];

  const customer = await UserModel.findOne({
    _id: query.customerId,
  });

  if (!customer) throw new Error('Customer does not exist');

  customer.queries = [
    ...(customer.queries ?? []).filter((q) => q.id === query.id),
    query,
  ];

  await reply.save();
  await query.save();
  await customer.save();

  return query;
};

export const tag = async (queryId: string, tags: Array<string>) => {
  const query = await QueryModel.findOne({
    _id: queryId,
  });

  if (!query) throw new Error('Query does not exist');

  const createdTags = (await Promise.all(
    tags.map(async (tag) => {
      return await TagModel.findOne({ _id: tag });
    })
  )) as Array<Tag>;

  query.tags = createdTags;

  const customer = await UserModel.findOne({
    _id: query.customerId,
  });

  if (!customer) throw new Error('Customer does not exist');

  customer.queries = [
    ...(customer.queries ?? []).filter((q) => q.id === query.id),
    query,
  ];

  await query.save();
  await customer.save();

  return query;
};
