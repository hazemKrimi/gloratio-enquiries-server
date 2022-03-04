// Packages
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Meeting {
  public id?: String;

  @prop({ required: true })
  public date?: Date;

  @prop({ required: true })
  public subject?: string;

  @prop({ required: true })
  public notes?: string;
}

export const MeetingModel = getModelForClass(Meeting);
