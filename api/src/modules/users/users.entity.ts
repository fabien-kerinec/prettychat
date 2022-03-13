import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryKeyUuid } from '../../utils/decorators/PrimaryKeyUuid.decorator';

@Entity()
@ObjectType()
export class Users {
  @Field(() => ID)
  @PrimaryKeyUuid()
  id: number;

  @Property()
  @Field()
  @Unique()
  email: string;

  @Property({ nullable: true })
  @HideField()
  password?: string;
}
