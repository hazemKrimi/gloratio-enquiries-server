// Packages
import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';

// Models
import { Query } from './Query';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
  public id?: String;

  @prop({ required: true })
  public firstName?: string;

  @prop({ required: true })
  public lastName?: string;

  @prop({ required: true })
  public email?: string;

  @prop({ required: true })
  public phone?: string;

  @prop({ required: true })
  public address?: string;

  @prop({ required: true })
  public city?: string;

  @prop({ required: true })
  public country?: string;

  @prop({ required: true })
  public zip?: number;

  @prop({ required: true })
  public password?: string;

  @prop({ required: true })
  public role?: 'user' | 'customer' | 'admin' = 'customer';

  @prop({ required: false })
  public queries?: Array<Query>;
}

export const UserModel = getModelForClass(User);
