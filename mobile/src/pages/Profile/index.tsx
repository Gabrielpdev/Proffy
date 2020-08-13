import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import BackgroundImg from '../../assets/images/background.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import {
  Container,
  Background,
  // BackButton,
  Title,
  AvatarContainer,
  UserAvatarButton,
  UserAvatar,
  Form,
  TitleForm,
  TextArena,
  FormFooter,
  ImageIcon,
  StudyButton,
  TeacherButton,
  TextButton,
  Button,
  ButtonText,
} from './styles';

const Profile: React.FC = () => {
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const passwordConfirmationInputRef = useRef<TextInput | null>(null);

  const whatsappInputRef = useRef<TextInput>(null);
  const bioInputRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    async function getPermissionAsync(): Promise<void> {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Desculpe, precisamos da permissão para trocarmos seu avatar!');
        }
      }
    }
    getPermissionAsync();
  }, []);

  const handleSubmit = useCallback(() => {}, []);

  const toggleIsTeacher = useCallback(() => {
    setIsTeacher(state => !state);
  }, []);

  const handleUpdateAvatar = useCallback(async () => {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(data);

    // const data = new FormData();

    // data.append('avatar', {
    //   type: 'image/jpeg',
    //   name: 'Gabriel.jpg',
    //   uri: response.uri,
    // });
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <PageHeader titleBar="Meu perfil">
              <Background source={BackgroundImg} resizeMode="contain">
                {/* <BackButton onPress={handleGoBack}>
                  <Feather name="arrow-left" size={24} color="#999591" />
                </BackButton> */}

                <AvatarContainer>
                  <UserAvatar
                    source={{
                      uri:
                        'https://avatars2.githubusercontent.com/u/61878136?s=460&u=e4b113d2332fdb1c09b3be7cb626923e86f89ae1&v=4',
                    }}
                  />
                  <UserAvatarButton onPress={handleUpdateAvatar}>
                    <Feather name="camera" size={25} color="#fff" />
                  </UserAvatarButton>
                </AvatarContainer>

                <Title>Gabriel Pereira</Title>
              </Background>
            </PageHeader>

            <Form>
              <TitleForm>Seus Dados</TitleForm>
              <Input
                autoCapitalize="words"
                title="Nome"
                icon="user"
                placeholder="Nome"
                value={name}
                onChangeText={text => setName(text)}
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
                icon="mail"
                placeholder="E-mail"
                value={email}
                onChangeText={text => setEmail(text)}
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
                ref={passwordInputRef}
                secureTextEntry
                icon="lock"
                placeholder="Nova senha"
                title="Nova Senha"
                containerStyle={{ paddingTop: 40 }}
                value={password}
                onChangeText={text => setPassword(text)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordConfirmationInputRef}
                secureTextEntry
                icon="lock"
                placeholder="Confirmação de senha"
                title="Confirme sua senha"
                value={password_confirmation}
                onChangeText={text => setPasswordConfirmation(text)}
              />

              <Button onPress={handleSubmit}>
                <ButtonText>Confirmar mudanças</ButtonText>
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
