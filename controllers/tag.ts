// Models
import { Tag, TagModel } from '../models/Tag';

// Types
import { TagInput } from '../types/tag';

export const find = async () => {
  return await TagModel.find();
};

export const findOne = async (id: string) => {
  return await TagModel.findOne({ _id: id });
};

export const create = async (body: TagInput): Promise<Tag> => {
  const { name } = body;

  const tag = await TagModel.create({
    name,
  });

  await tag.save();

  return tag;
};

export const remove = async (id: string): Promise<Tag> => {
  const tag = await TagModel.findOne({ _id: id });

  if (!tag) throw new Error('Tag does not exist');

  await TagModel.deleteOne({ _id: tag.id });

  return tag;
};
