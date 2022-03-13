import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  forwardRef,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type FormInputProps = {
  error?: FieldError;
} & InputProps;

const FormInput = forwardRef<FormInputProps, 'input'>(
  ({ name, children, error, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {children && (
          <FormLabel htmlFor={name} fontWeight="500">
            {children}
          </FormLabel>
        )}
        <Input bg="white" {...rest} ref={ref} />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

export default FormInput;
