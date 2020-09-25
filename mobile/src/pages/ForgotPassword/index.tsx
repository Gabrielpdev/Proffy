import React, { useState, useCallback, useRef } from 'react';

import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';

import logoImg from '../../assets/images/logo.png';
import backgroundImg from '../../assets/images/give-classes-background-horizontal.png';

import {
  Container,
  Background,
  LogoContainer,
  Logo,
  LogoDescription,
  Icon,
  Forms,
  TitleBlock,
  Title,
  Description,
  Button,
  ButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { navigate, goBack } = useNavigation();

  const handleSubmit = useCallback(() => {}, []);

  const handleNavigateToEmailSended = useCallback(() => {
    navigate('ForgotSend');
  }, [navigate]);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView>
          <Container>
            <Background source={backgroundImg} resizeMode="repeat">
              <LogoContainer>
                <Logo source={logoImg} resizeMode="contain" />
                <LogoDescription>
                  Sua plataforma de estudos online
                </LogoDescription>
              </LogoContainer>
            </Background>

            <Forms onSubmit={handleNavigateToEmailSended} ref={formRef}>
              <Icon onPress={handleGoBack}>
                <Feather name="arrow-left" size={20} color="#9C98A6" />
              </Icon>
              <TitleBlock>
                <Title>Esqueceu sua senha ?</Title>
                <Description>
                  Não esquenta,
                  {'\n'}
                  vamos dar um jeito nisso,
                </Description>
              </TitleBlock>

              <Input
                title="Email"
                icon="mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Digite seu email"
                name="email"
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                <ButtonText>Enviar</ButtonText>
              </Button>
            </Forms>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
