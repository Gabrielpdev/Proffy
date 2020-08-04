import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { Container, LogoContainer, ButtonContainer } from './styles'

const Landing: React.FC = () => {
  return <Container id="page-landing">
    <div id="page-landing-content" className="container">
      <LogoContainer className="logo-container">
        <img src={logoImg} alt="Proffy"/>
        <h2>Sua plataforma de estudos online</h2>
      </LogoContainer>

      <img src={landingImg} alt="Plataforma de estudos" className="hero-image"/>

      <ButtonContainer className="buttons-container">
        <Link to="study" className="study">
          <img src={studyIcon} alt="estudar"/>
          Estudar
        </Link>
        <Link to="give-classes" className="give-classes">
          <img src={giveClassIcon} alt="estudar"/>
          Dar Aulas
        </Link>
      </ButtonContainer>

      <span className="total-connection">
        Total de 200 conexões já realizadas 
        <img src={purpleHeartIcon} alt="Coração roxo"/>
      </span>

    </div>
  </Container>;
}

export default Landing;