export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Users;
  login: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationLoginArgs = {
  input: UserCreateInput;
};

export type Query = {
  __typename?: 'Query';
  users: Users;
};


export type QueryUsersArgs = {
  id: Scalars['ID'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  email: Scalars['String'];
  id: Scalars['ID'];
};
