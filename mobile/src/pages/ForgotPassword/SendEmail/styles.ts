import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #8257e5;
  align-items: center;
`;

export const Banner = styled.ImageBackground`
  flex: 1;
  width: 90%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Icon = styled(Feather)`
  margin-top: auto;
  align-self: center;
`;

export const Title = styled.Text`
  margin-top: 24px;
  align-self: center;
  text-align: center;
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 32px;
  line-height: 37px;
`;

export const Description = styled.Text`
  margin-top: 16px;
  font-family: 'Poppins_400Regular';
  align-self: center;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  color: #d4c2ff;
`;

export const Button = styled(RectButton)`
  margin: 40% 0 40% 0;
  align-items: center;
  justify-content: center;
  background: #04d361;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 16px;
  color: #fff;
`;
