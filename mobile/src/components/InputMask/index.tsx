import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { TextInputMaskProps } from 'react-native-masked-text';
import { Container, Title, Content, Input, Icon } from './styles';

interface InputProps extends TextInputMaskProps {
  containerStyle?: {};
  title: string;
  icon?: string;
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputMask: React.RefForwardingComponent<InputRef, InputProps> = (
  { containerStyle, title, value, icon, ...rest },
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
    <Container style={containerStyle}>
      <Title isFocused={isFocused}>{title}</Title>
      <Content isFocused={isFocused}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#8257e5' : '#9c98a6'}
        />

        <Input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputElementRef}
          {...rest}
        />
      </Content>
    </Container>
  );
};

export default forwardRef(InputMask);
