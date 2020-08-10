import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import backgroundImg from '../../../assets/images/give-classes-background.png';

import {
  Container,
  Banner,
  Icon,
  Title,
  Description,
  Button,
  ButtonText,
} from './styles';

const Finished: React.FC = () => {
  const { reset } = useNavigation();

  const handleFinish = useCallback(() => {
    reset({
      routes: [{ name: 'SignIn' }],
      index: 0,
    });
  }, [reset]);

  return (
    <Container>
      <Banner source={backgroundImg} resizeMode="contain">
        <Icon name="check-square" size={100} color="#04D361" />
        <Title>
          Cadastro
          {'\n'}
          concluído!
        </Title>
        <Description>
          Agora você faz parte da
          {'\n'}
          plataforma da Proffy
        </Description>
        <Button onPress={handleFinish}>
          <ButtonText>Próximo</ButtonText>
        </Button>
      </Banner>
    </Container>
  );
};

export default Finished;
