import { Box, Button, Link, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import Form from '@/components/atoms/Form';
import FormInput from '@/components/atoms/FormInput';
import { formatError } from '@/utils/error';

const LoginForm = () => {
  const toast = useToast();

  const loginSchema = z.object({
    email: z.string().email('Invalid email').nonempty('Email is required'),
    password: z.string(),
  });

  type FormData = z.infer<typeof loginSchema>;

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
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await signIn<'credentials'>('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.error) throw new Error(response.error);

      toast.closeAll();
      toast({
        description: 'You have been logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      router.push(Routes.Home.path);
    } catch (error: unknown) {
      const message = formatError(error);

      toast({
        description: t([`errors:api.${message}`, 'errors:api.default']),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  });

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
          );
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
          );
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
          {t('organisms.LoginForm.submit')}
        </Button>
        <NextLink href={Routes.ForgotPassword.path} passHref>
          <Link fontWeight="600" color="primary" float="right" mt={2}>
            {t('organisms.LoginForm.forgotPassword')}
          </Link>
        </NextLink>
      </Box>
    </Form>
  );
};

export default LoginForm;
