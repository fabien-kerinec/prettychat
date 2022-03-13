import { ApolloError } from '@apollo/client';

export const formatError = (error: unknown) => {
  return error instanceof ApolloError
    ? error.graphQLErrors[0].message
    : error instanceof Error
    ? error.message
    : 'default';
};
