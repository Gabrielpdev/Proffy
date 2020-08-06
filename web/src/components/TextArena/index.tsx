import React, { TextareaHTMLAttributes } from 'react';

import { Container } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ title, name, ...rest }) => {
  return (
    <Container>
      <label htmlFor={name}>{title}</label>
      <textarea {...rest} id={name} />
    </Container>
  );
};

export default TextArea;
