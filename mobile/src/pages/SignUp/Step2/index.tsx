import React, { useRef, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import { FormHandles } from '@unform/core';
import Input from '../../../components/Input';

import {
  Container,
  Header,
  Icon,
  HeaderRight,
  Dot1,
  Dot2,
  Title,
  Description,
  Forms,
  FormTitle,
  FormButton,
  FormButtonText,
} from './styles';
import api from '../../../services/api';

interface Step2Props {
  email: string;
  password: string;
}

const Step2: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { params } = useRoute();
  const { goBack, reset } = useNavigation();

  const passwordInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleContinue = useCallback(
    async (data: Step2Props) => {
      const formData = {
        ...params,
        ...data,
      };

      try {
        console.log({ ...formData });
        await api.post('/users', { ...formData });

        reset({
          index: 1,
          routes: [{ name: 'SignIn' }, { name: 'Finished' }],
        });
      } catch (err) {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer o cadastro, cheque seu dados.',
        );
      }
    },
    [reset, params],
  );

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        <Container>
          <Header>
            <Icon onPress={handleGoBack}>
              <Feather name="arrow-left" size={20} color="#9c98a6" />
            </Icon>
            <HeaderRight>
              <Dot1 />
              <Dot2 />
            </HeaderRight>
          </Header>

          <Title>
            Crie sua
            {'\n'}
            conta gratuíta
          </Title>
          <Description>
            Basta preencher esses dados
            {'\n'}
e você estará conosco.
</Description>

          <Forms onSubmit={handleContinue} ref={formRef}>
            <FormTitle>03. Email e Senha</FormTitle>

            <Input
              title="Email"
              icon="mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Digite seu email"
              name="email"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              title="Senha"
              icon="lock"
              placeholder="Digite sua senha"
              name="password"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <FormButton
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <FormButtonText>Concluir cadastro</FormButtonText>
            </FormButton>
          </Forms>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step2;
