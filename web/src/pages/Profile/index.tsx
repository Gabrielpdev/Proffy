import React, { useState, useCallback, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';

import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArena';
import { api } from '../../services/api';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';

import {
  Container,
  HeaderProfile,
  Content,
  DataContent,
  ButtonContainer,
  SelectButton,
  WarningContent,
} from './styles';
import { useAuth } from '../../hooks/auth';

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [avatar, setAvatar] = useState(user.avatar);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [bio, setBio] = useState(user.bio);
  const [isTeacher, setIsTeacher] = useState(user.is_teacher);

  const addNewUser = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      let data = {};
      if (password === '') {
        data = {
          name,
          avatar,
          whatsapp,
          bio,
          email,
          is_teacher: isTeacher,
        };
      } else {
        data = {
          name,
          avatar,
          whatsapp,
          bio,
          email,
          is_teacher: isTeacher,
          password,
          password_confirmation,
        };
      }

      api
        .put('/users', data)
        .then((response) => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Perfil atualizado!.',
          });
          window.scrollTo(0, 0);
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro ao atualizar perfil',
            description: 'Ocorreu um erro ao atualizar, tente novamente.',
          });
        });
    },
    [
      name,
      avatar,
      whatsapp,
      bio,
      email,
      password,
      password_confirmation,
      isTeacher,
      updateUser,
      addToast,
    ],
  );

  const toggleTeacher = useCallback(() => {
    setIsTeacher(!isTeacher);
  }, [isTeacher]);

  return (
    <Container>
      <PageHeader title="">
        <HeaderProfile>
          <img src={user.avatar} alt={user.name} />

          <strong>{user.name}</strong>
        </HeaderProfile>
      </PageHeader>

      <Content onSubmit={addNewUser}>
        <DataContent>
          <legend>Seus Dados</legend>

          <Input
            name="name"
            title="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            name="email"
            title="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            name="avatar"
            title="Avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Input
            name="whatsapp"
            title="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <TextArea
            name="bio"
            title="Biografia "
            description="(Máx: 250 caractéres)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <hr />

          <Input
            name="password"
            title="Nova Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            name="password_confirmation"
            title="Confirmação de Senha"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </DataContent>

        <ButtonContainer className="buttons-container">
          <SelectButton
            type="button"
            className="study"
            onClick={toggleTeacher}
            isSelected={!isTeacher}
          >
            <img src={studyIcon} alt="estudar" />
            Estudante
          </SelectButton>
          <SelectButton
            type="button"
            className="give-classes"
            onClick={toggleTeacher}
            isSelected={isTeacher}
          >
            <img src={giveClassIcon} alt="estudar" />
            Professor
          </SelectButton>
        </ButtonContainer>

        <WarningContent>
          <p>
            <img src={warningIcon} alt="Aviso Icone" />
            Importante ! <br />
            Preencha todos os dados
          </p>

          <button type="submit">Atualizar Perfil</button>
        </WarningContent>
      </Content>
    </Container>
  );
};

export default Profile;
