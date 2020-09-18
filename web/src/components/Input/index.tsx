import React from 'react';
import InputMask, { Props } from 'react-input-mask';

import { Container } from './styles';

interface InputProps extends Props {
  title: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ title, name, ...rest }) => {
  return (
    <Container>
      <label htmlFor={name}>{title}</label>
      <InputMask id={name} {...rest} />
    </Container>
  );
};

export default Input;
