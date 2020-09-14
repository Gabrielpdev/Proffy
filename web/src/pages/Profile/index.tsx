import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { FiCamera } from 'react-icons/fi';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';

import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArena';
import { api } from '../../services/api';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';
import userIcon from '../../assets/images/icons/user.png';

import {
  Container,
  HeaderProfile,
  AvatarField,
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
  const [old_password, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [bio, setBio] = useState(user.bio);
  const [isTeacher, setIsTeacher] = useState(user.is_teacher);

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const updateTheUser = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

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

      console.log(formData);

      api
        .put('/profile', formData)
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
      whatsapp,
      bio,
      email,
      old_password,
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
          <AvatarField>
            <img src={user.avatar_url || userIcon} alt="" />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarField>
          <strong>{user.name}</strong>
        </HeaderProfile>
      </PageHeader>

      <Content onSubmit={updateTheUser}>
        <DataContent>
          <legend>Seus Dados</legend>

          <ButtonContainer className="buttons-container">
            <span>O que você é ?</span>
            <div className="buttons">
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
            </div>
          </ButtonContainer>

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
            name="old_password"
            title="Senha Atual"
            type="password"
            value={old_password}
            onChange={(e) => setOldPassword(e.target.value)}
          />
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
