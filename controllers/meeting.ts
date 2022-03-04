// Models
import { Meeting, MeetingModel } from '../models/Meeting';

// Types
import { MeetingInput } from '../types/meeting';

export const find = async () => {
  return await MeetingModel.find();
};

export const findOne = async (id: string) => {
  return await MeetingModel.findOne({ _id: id });
};

export const create = async (body: MeetingInput): Promise<Meeting> => {
  const { date, subject, notes } = body;

  const meeting = await MeetingModel.create({
    date,
    subject,
    notes,
  });

  await meeting.save();

  return meeting;
};
