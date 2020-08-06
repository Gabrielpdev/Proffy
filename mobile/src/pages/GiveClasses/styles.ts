import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #8257e5;
  justify-content: center;
  padding: 40px;
`;

export const Background = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #fff;
  line-height: 37px;
  max-width: 180px;
`;

export const Description = styled.Text`
  margin-top: 24px;
  color: #d4c2ff;
  font-size: 16px;
  line-height: 26px;
  font-family: 'Poppins_400Regular';
  max-width: 250px;
`;

export const Button = styled(RectButton)`
  margin: 40px 0;
  background: #04d361;
  height: 58px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const ButtonDescription = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Archivo_700Bold';
`;
