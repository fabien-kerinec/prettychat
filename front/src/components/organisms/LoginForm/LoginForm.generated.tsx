import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LoginFormLoginMutationVariables = Types.Exact<{
  input: Types.UserCreateInput;
}>;


export type LoginFormLoginMutation = { __typename?: 'Mutation', login: string };


export const LoginFormLoginDocument = gql`
    mutation LoginFormLogin($input: UserCreateInput!) {
  login(input: $input)
}
    `;
export type LoginFormLoginMutationFn = Apollo.MutationFunction<LoginFormLoginMutation, LoginFormLoginMutationVariables>;

/**
 * __useLoginFormLoginMutation__
 *
 * To run a mutation, you first call `useLoginFormLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFormLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFormLoginMutation, { data, loading, error }] = useLoginFormLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginFormLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginFormLoginMutation, LoginFormLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginFormLoginMutation, LoginFormLoginMutationVariables>(LoginFormLoginDocument, options);
      }
export type LoginFormLoginMutationHookResult = ReturnType<typeof useLoginFormLoginMutation>;
export type LoginFormLoginMutationResult = Apollo.MutationResult<LoginFormLoginMutation>;
export type LoginFormLoginMutationOptions = Apollo.BaseMutationOptions<LoginFormLoginMutation, LoginFormLoginMutationVariables>;