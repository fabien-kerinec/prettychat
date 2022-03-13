import { Box, Button, Link as LinkUI, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../../components/atoms/Form'
import FormInput from '../../..//components/atoms/FormInput'
import { formatError } from '../../../utils/error'
import { useLoginFormLoginMutation } from './LoginForm.generated'
import { useAuth } from '../../../context/auth'

const LoginForm = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [loginMutation, { loading, error }] = useLoginFormLoginMutation({
    // workaround for unhandled error rejection
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: () => {},
  })
  const { setAuthToken, authToken } = useAuth()
  const loginSchema = z.object({
    email: z.string().email('Invalid email').nonempty('Email is required'),
    password: z.string(),
  })

  type FormData = z.infer<typeof loginSchema>

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await loginMutation({ variables: { input: values } })

      if (result?.data?.login) {
        setAuthToken?.(result.data.login)
      }

      toast.closeAll()
      toast({
        description: 'You have been logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      navigate('/')
    } catch (error: unknown) {
      const message = formatError(error)

      toast({
        description: { message },
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })

  return (
    <Form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="email"
        render={({ field: { ...props }, fieldState: { error } }) => {
          return (
            <FormInput type="email" error={error} {...props}>
              {'email'}
            </FormInput>
          )
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { ...props }, fieldState: { error } }) => {
          return (
            <FormInput type="password" error={error} {...props}>
              {'password'}
            </FormInput>
          )
        }}
      />
      <Box width="100%">
        <Button
          width="100%"
          isLoading={isSubmitting}
          type="submit"
          bg="primary"
          color="white"
          mt={2}
        >
          {'Login'}
        </Button>
        <Link
          to={{
            pathname: '/',
          }}
        >
          <LinkUI fontWeight="600" color="primary" float="right" mt={2}>
            {'Forgot password?'}
          </LinkUI>
        </Link>
      </Box>
    </Form>
  )
}

export default LoginForm
