import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import {
  Container,
  Background,
  Title,
  Description,
  Button,
  ButtonDescription,
} from './styles';

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation();

  const backToLanding = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <Background source={giveClassesBgImage} resizeMode="contain">
        <Title>Quer ser um Proffy ?</Title>

        <Description>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Description>
      </Background>

      <Button onPress={backToLanding}>
        <ButtonDescription>Tudo bem</ButtonDescription>
      </Button>
    </Container>
  );
};

export default GiveClasses;
