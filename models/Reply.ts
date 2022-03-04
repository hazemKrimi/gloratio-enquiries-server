// Packages
import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';

// Models
import { User } from './User';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Reply {
  public id?: String;

  @prop({ required: true })
  public content?: string;

  @prop({ required: true })
  public by?: Omit<User, 'queries' | 'password'>;
}

export const ReplyModel = getModelForClass(Reply);
