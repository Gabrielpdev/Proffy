import React, { useState, useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

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
  Form,
  FormTitle,
  TextArena,
  FormButton,
  FormButtonText,
} from './styles';

const Step2: React.FC = () => {
  const { goBack, reset } = useNavigation();

  const passwordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleContinue = useCallback(() => {
    reset({
      index: 1,
      routes: [{ name: 'SignIn' }, { name: 'Finished' }],
    });
  }, [reset]);

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
            {'\n'}e você estará conosco.
          </Description>

          <Form>
            <FormTitle>03. Email e Senha</FormTitle>

            <Input
              title="Email"
              icon="mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Digite seu email"
              value={email}
              onChangeText={text => setEmail(text)}
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
              value={password}
              onChangeText={text => setPassword(text)}
              returnKeyType="next"
            />

            <FormButton onPress={handleContinue}>
              <FormButtonText>Concluir cadastro</FormButtonText>
            </FormButton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step2;
