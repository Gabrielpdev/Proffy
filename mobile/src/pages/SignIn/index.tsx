import React, { useState, useCallback, useRef } from 'react';

import { TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import landingImg from '../../assets/images/landing.png';
import logoImg from '../../assets/images/logo.png';

import Input from '../../components/Input';

import {
  Container,
  LogoContainer,
  Logo,
  LogoDescription,
  Banner,
  Form,
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

const SignIn: React.FC = () => {
  const formRef = useRef(null);

  const passwordInputRef = useRef<TextInput>(null);

  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

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
            <Form>
              <TitleBlock>
                <Title>Fazer login</Title>
                <Create>
                  <CreateCount>Criar uma conta</CreateCount>
                </Create>
              </TitleBlock>

              <Input
                title="Email"
                icon="user"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
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
                value={password}
                onChangeText={text => setPassword(text)}
                returnKeyType="next"
              />

              <Footer>
                <Remember>
                  <RememberButton onPress={toggleRemember}>
                    <Icon name="check" remember={remember} />
                    <RememberButtonText>Lembrar-me</RememberButtonText>
                  </RememberButton>
                </Remember>

                <Forgot onPress={() => {}}>
                  <ForgotText>Esqueci minha senha</ForgotText>
                </Forgot>
              </Footer>

              <Button onPress={handleSubmit}>
                <ButtonText>Entrar</ButtonText>
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
