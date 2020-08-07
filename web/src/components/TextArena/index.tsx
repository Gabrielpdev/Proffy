import React, { TextareaHTMLAttributes } from 'react';

import { Container } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  name: string;
  description?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  title,
  name,
  description,
  ...rest
}) => {
  return (
    <Container>
      <div>
        <label htmlFor={name}>{title}</label>
        <label htmlFor={name}>{description}</label>
      </div>
      <textarea {...rest} id={name} />
    </Container>
  );
};

export default TextArea;
