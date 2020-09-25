import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Alert, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { useAuth } from '../../hooks/auth';

import BackgroundImg from '../../assets/images/background.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import userImg from '../../assets/images/user.png';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import {
  Container,
  Background,
  Title,
  AvatarContainer,
  UserAvatarButton,
  UserAvatar,
  TitleForm,
  TextArena,
  Forms,
  FormFooter,
  ImageIcon,
  BottonsTittle,
  StudyButton,
  TeacherButton,
  TextButton,
  Button,
  ButtonText,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  whatsapp: string;
  bio: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, updateUser } = useAuth();

  const emailInputRef = useRef<TextInput | null>(null);
  const oldPasswordInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const passwordConfirmationInputRef = useRef<TextInput | null>(null);

  const whatsappInputRef = useRef<TextInput>(null);
  const bioInputRef = useRef<TextInput>(null);

  const [isTeacher, setIsTeacher] = useState(user.is_teacher);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const {
          name,
          email,
          whatsapp,
          bio,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          whatsapp,
          bio,
          is_teacher: isTeacher,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');
      } catch (err) {
        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
        console.log(err);
      }
    },
    [updateUser, isTeacher],
  );

  const toggleIsTeacher = useCallback(() => {
    setIsTeacher(state => !state);
  }, []);

  const handleUpdateAvatar = useCallback(async () => {
    async function getPermissionAsync(): Promise<void> {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Desculpe, precisamos da permissão para trocarmos seu avatar!');
        }
      }
    }
    getPermissionAsync();

    const imageURL = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const data = new FormData();

    data.append('avatar', {
      type: 'image/jpeg',
      name: `${user.id}.jpg`,
      uri: imageURL.uri,
    });

    api.patch('users/avatar', data).then(apiResponse => {
      updateUser(apiResponse.data);
      Alert.alert('Avatar atualizado com sucesso');
    });
  }, [updateUser, user.id]);

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <PageHeader titleBar="Meu perfil">
            <Background source={BackgroundImg} resizeMode="contain">
              <AvatarContainer>
                {user.avatar_url ? (
                  <UserAvatar
                    source={{
                      uri: user.avatar_url.replace(
                        'localhost',
                        '192.168.0.112',
                      ),
                    }}
                  />
                ) : (
                  <UserAvatar source={userImg} />
                )}
                <UserAvatarButton onPress={handleUpdateAvatar}>
                  <Feather name="camera" size={25} color="#fff" />
                </UserAvatarButton>
              </AvatarContainer>

              <Title>{user.name}</Title>
            </Background>
          </PageHeader>

          <Forms onSubmit={handleSubmit} ref={formRef} initialData={user}>
            <TitleForm>Seus Dados</TitleForm>
            <BottonsTittle>O que você é ?</BottonsTittle>
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

            <Input
              autoCapitalize="words"
              title="Nome"
              icon="user"
              placeholder="Nome"
              name="name"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              title="Email"
              name="email"
              icon="mail"
              placeholder="E-mail"
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
              name="whatsapp"
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
              name="bio"
              returnKeyType="next"
            />

            <Input
              ref={oldPasswordInputRef}
              secureTextEntry
              name="old_password"
              icon="lock"
              title="Senha atual"
              placeholder="Senha atual"
              returnKeyType="next"
              containerStyle={{ marginTop: 16 }}
              onSubmitEditing={() => {
                passwordInputRef.current.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              title="Nova Senha"
              placeholder="Nova senha"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordConfirmationInputRef.current.focus();
              }}
            />

            <Input
              ref={passwordConfirmationInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              title="Confirmação de senha"
              placeholder="Confirmação de senha"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <ButtonText>Confirmar mudanças</ButtonText>
            </Button>
          </Forms>
        </Container>
      </ScrollView>
    </>
  );
};

export default Profile;
