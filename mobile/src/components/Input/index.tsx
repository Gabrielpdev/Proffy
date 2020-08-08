import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';

import { Container, Title, Content, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  title: string;
  icon: string;
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { title, value, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <Container>
      <Title>{title}</Title>
      <Content isFocused={isFocused}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#8257e5' : '#9c98a6'}
        />
        <TextInput
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputElementRef}
          {...rest}
        />
      </Content>
    </Container>
  );
};

export default forwardRef(Input);
