// Packages
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Tag {
  public id?: String;

  @prop({ required: true })
  public name?: string;
}

export const TagModel = getModelForClass(Tag);
