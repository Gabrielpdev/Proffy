import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from 'react';
import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';
import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';
import { Container, Title, Content, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  containerStyle?: {};
  title: string;
  icon?: string;
  textArena?: boolean;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {
    name,
    icon,
    containerStyle,
    title,
    textArena = false,
    type,
    options,
    ...rest
  },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { defaultValue = '', error, fieldName, registerField } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = 'value';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

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
            options={options}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputElementRef}
            defaultValue={defaultValue}
            onChangeText={value => {
              inputValueRef.current.value = value;
            }}
            {...rest}
          />
        ) : (
          <TextInput
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputElementRef}
            defaultValue={defaultValue}
            onChangeText={value => {
              inputValueRef.current.value = value;
            }}
            {...rest}
          />
        )}
      </Content>
    </Container>
  );
};

export default forwardRef(Input);
