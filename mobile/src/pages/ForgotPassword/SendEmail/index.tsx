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
          Redefinição
          {'\n'}
          enviada!
        </Title>
        <Description>
          Boa, agora é só checar o e-mail que foi
          {'\n'}
          enviado para você redefinir sua senha
          {'\n'}e aproveitar os estudos
        </Description>
        <Button onPress={handleFinish}>
          <ButtonText>Voltar ao login</ButtonText>
        </Button>
      </Banner>
    </Container>
  );
};

export default Finished;
