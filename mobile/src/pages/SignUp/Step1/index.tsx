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

import { FormHandles } from '@unform/core';
import Input from '../../../components/Input';

import studyIcon from '../../../assets/images/icons/study.png';
import giveClassesIcon from '../../../assets/images/icons/give-classes.png';

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
  FormQuestion1,
  TextArena,
  FormFooter,
  ImageIcon,
  FormQuestion2,
  StudyButton,
  TeacherButton,
  TextButton,
  FormButton,
  FormButtonText,
} from './styles';

interface Step1Props {
  name: string;
  whatsapp: string;
  bio: string;
}

const Step1: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack, navigate } = useNavigation();

  const whatsappInputRef = useRef<TextInput | null>(null);
  const bioInputRef = useRef<TextInput | null>(null);

  const [isTeacher, setIsTeacher] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleContinue = useCallback(
    async (data: Step1Props) => {
      try {
        if (whatsapp.length !== 11) {
          throw new Error('Número de telefone deve estar completo.');
        }
        const formData = {
          ...data,
          whatsapp,
          is_teacher: isTeacher,
        };
        navigate('Step2', formData);
      } catch (err) {
        Alert.alert('Erro', err.message);
      }
    },
    [navigate, whatsapp, isTeacher],
  );

  const toggleIsTeacher = useCallback(() => {
    setIsTeacher(state => !state);
  }, []);

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

          <Forms onSubmit={handleContinue} ref={formRef}>
            <FormQuestion1>01. Quem é você ?</FormQuestion1>

            <Input
              title="Nome"
              icon="user"
              placeholder="Digite seu nome"
              name="name"
            />
            <Input
              ref={whatsappInputRef}
              type="cel-phone"
              title="Whatsapp"
              icon="phone"
              placeholder="Digite seu whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChangeText={value =>
                setWhatsapp(
                  value
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', ''),
                )}
              returnKeyType="next"
              onSubmitEditing={() => {
                bioInputRef.current?.focus();
              }}
            />
            <TextArena
              ref={bioInputRef}
              title="Bio"
              icon="edit-2"
              multiline
              name="bio"
              textArena
              numberOfLines={4}
              placeholder="Fale sobre você"
            />

            <FormQuestion2>02. O que você quer fazer ?</FormQuestion2>
            <FormFooter>
              <StudyButton isSelected={!isTeacher} onPress={toggleIsTeacher}>
                <ImageIcon source={studyIcon} />
                <TextButton>Estudar</TextButton>
              </StudyButton>

              <TeacherButton isSelected={isTeacher} onPress={toggleIsTeacher}>
                <ImageIcon source={giveClassesIcon} />
                <TextButton>Dar aula</TextButton>
              </TeacherButton>
            </FormFooter>

            <FormButton
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <FormButtonText>Próximo</FormButtonText>
            </FormButton>
          </Forms>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step1;
