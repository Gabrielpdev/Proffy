import React, { useCallback, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';

import { Container, LogoContainer, Form, Footer } from './styles';

const SignIn: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        await signIn({
          email,
          password,
        });

        history.push('/dashboard');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, cheque suas credenciais',
        });
      }
    },
    [email, history, password, signIn, addToast],
  );

  return (
    <Container>
      <div id="page-landing-content">
        <LogoContainer>
          <img src={logoImg} alt="Proffy" className="proffy-image" />
          <h2>Sua plataforma de estudos online</h2>
          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </LogoContainer>

        <Form onSubmit={handleSubmit}>
          <strong>Fazer login</strong>
          <Input
            name="email"
            title="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            name="password"
            title="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>

          <Footer>
            <div>
              <span>Não tem conta ?</span>
              <Link to="signup">Cadastre-se</Link>
            </div>

            <span>
              É de graça
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>
          </Footer>
        </Form>
      </div>
    </Container>
  );
};

export default SignIn;
