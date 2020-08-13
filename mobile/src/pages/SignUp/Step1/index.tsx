import React, { useState, useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

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
  Form,
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

const Step1: React.FC = () => {
  const { goBack, navigate } = useNavigation();

  const whatsappInputRef = useRef<TextInput>(null);
  const bioInputRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleContinue = useCallback(() => {
    navigate('Step2');
  }, [navigate]);

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
            {'\n'}
e você estará conosco.
</Description>

          <Form>
            <FormQuestion1>01. Quem é você ?</FormQuestion1>

            <Input
              title="Nome"
              icon="user"
              value={name}
              placeholder="Digite seu nome"
              onChangeText={text => setName(text)}
              returnKeyType="next"
              onSubmitEditing={() => {
                whatsappInputRef.current?.focus();
              }}
            />
            <Input
              ref={whatsappInputRef}
              title="Whatsapp"
              icon="phone"
              placeholder="Digite seu whatsapp"
              value={whatsapp}
              onChangeText={text => setWhatsapp(text)}
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
              textArena
              numberOfLines={4}
              placeholder="Fale sobre você"
              value={bio}
              onChangeText={text => setBio(text)}
              returnKeyType="next"
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

            <FormButton onPress={handleContinue}>
              <FormButtonText>Próximo</FormButtonText>
            </FormButton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step1;
