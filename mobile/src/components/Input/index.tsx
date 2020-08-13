import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';
import { Container, Title, Content, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  containerStyle?: {};
  title: string;
  icon?: string;
  value: string;
  textArena?: boolean;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  onChangeText(text: any): void;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {
    containerStyle,
    title,
    value,
    icon,
    textArena = false,
    type,
    options,
    onChangeText,
    ...rest
  },
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
      <Content isFocused={isFocused} textArena={textArena}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#8257e5' : '#9c98a6'}
        />
        {type ? (
          <TextInputMask
            type={type}
            value={value}
            onChangeText={onChangeText}
            options={options}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputElementRef}
            {...rest}
          />
        ) : (
          <TextInput
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputElementRef}
            {...rest}
          />
        )}
      </Content>
    </Container>
  );
};

export default forwardRef(Input);
