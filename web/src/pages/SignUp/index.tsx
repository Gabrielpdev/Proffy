import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';

import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArena';
import { api } from '../../services/api';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';
import smileIcon from '../../assets/images/icons/smile.svg';

import {
  Container,
  Content,
  DataContent,
  ButtonContainer,
  SelectButton,
  WarningContent,
} from './styles';

const SignUp: React.FC = () => {
  const { push } = useHistory();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get('users').then((response) => {
      setTotal(response.data.total);
    });
  }, []);

  const addNewUser = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      api
        .post('/users', {
          name,
          avatar,
          whatsapp,
          bio,
          email,
          password,
          password_confirmation,
          is_teacher: isTeacher,
        })
        .then(() => {
          addToast({
            type: 'success',
            title: 'Cadastro realizado.',
            description: 'Você já pode fazer o logon no GoBarber!',
          });

          push('/');
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
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
      push,
      isTeacher,
      addToast,
    ],
  );

  const toggleTeacher = useCallback(() => {
    setIsTeacher(!isTeacher);
  }, [isTeacher]);

  return (
    <Container>
      <PageHeader
        singUp
        title="Que incrível ter você em nossa plataforma."
        titleDescriptionIcon={smileIcon}
        titleDescription={`${total} usuários cadastrados !`}
      />

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
            name="password"
            title="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            name="password_confirmation"
            title="Password"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            title="Biografia"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
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

          <button type="submit">Salvar Cadastro</button>
        </WarningContent>
      </Content>
    </Container>
  );
};

export default SignUp;
