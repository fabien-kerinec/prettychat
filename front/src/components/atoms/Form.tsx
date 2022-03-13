import { Box, Grid } from '@chakra-ui/react';
import { HTMLAttributes, ReactNode } from 'react';

export type FormProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLFormElement> &
  HTMLAttributes<HTMLDivElement>;

const Form = ({ children, ...rest }: FormProps) => {
  return (
    <Box as={'form'} {...rest} width={'100%'}>
      <Grid templateRows={'1fr'} gap={4}>
        {children}
      </Grid>
    </Box>
  );
};

export default Form;
