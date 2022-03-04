// Packages
import {
  prop,
  getModelForClass,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';

// Models
import { Reply } from './Reply';
import { Tag } from './Tag';
import { User } from './User';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Query {
  public id?: String;

  @prop({ required: true })
  public customerId?: string;

  @prop({ required: true })
  public customer?: User;

  @prop({ required: true })
  public title?: string;

  @prop({ required: true })
  public subject?: string;

  @prop({ required: true })
  public content?: string;

  @prop({ required: false })
  replies?: Array<Reply>;

  @prop({ required: false })
  tags?: Array<Tag>;
}

export const QueryModel = getModelForClass(Query);
