import React, { useState, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import landingImg from '../../assets/images/landing.png';
import logoImg from '../../assets/images/logo.png';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';

import {
  Container,
  LogoContainer,
  Logo,
  LogoDescription,
  Banner,
  Forms,
  TitleBlock,
  Title,
  Create,
  CreateCount,
  Footer,
  Remember,
  RememberButton,
  Icon,
  RememberButtonText,
  Forgot,
  ForgotText,
  Button,
  ButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const passwordInputRef = useRef<TextInput>(null);

  const [remember, setRemember] = useState(false);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer o login, cheque seu dados.',
        );
      }
    },
    [signIn],
  );

  const handleNavigateToCreate = useCallback(() => {
    navigation.navigate('Step1');
  }, [navigation]);

  const handleNavigateToForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const toggleRemember = useCallback(() => {
    setRemember(state => !state);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView>
          <Container>
            <LogoContainer>
              <Logo source={logoImg} resizeMode="contain" />
              <LogoDescription>
                Sua plataforma de estudos online
              </LogoDescription>
              <Banner source={landingImg} resizeMode="contain" />
            </LogoContainer>

            <Forms onSubmit={handleSignIn} ref={formRef}>
              <TitleBlock>
                <Title>Fazer login</Title>
                <Create onPress={handleNavigateToCreate}>
                  <CreateCount>Criar uma conta</CreateCount>
                </Create>
              </TitleBlock>

              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                title="Email"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                title="Senha"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Footer>
                <Remember>
                  <RememberButton onPress={toggleRemember}>
                    <Icon name="check" remember={remember} />
                    <RememberButtonText>Lembrar-me</RememberButtonText>
                  </RememberButton>
                </Remember>

                <Forgot onPress={handleNavigateToForgotPassword}>
                  <ForgotText>Esqueci minha senha</ForgotText>
                </Forgot>
              </Footer>

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                <ButtonText>Entrar</ButtonText>
              </Button>
            </Forms>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
