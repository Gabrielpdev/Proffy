import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #8257e5;
`;

export const Content = styled.View`
  padding: 40px;
`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #774dd6;
  padding: 50px 20px 20px 20px;
`;

export const TitleBar = styled.Text`
  font-family: 'Archivo_400Regular';
  font-size: 14px;
  line-height: 15px;
  color: #d4c2ff;
`;

export const Button = styled(BorderlessButton)``;

export const Title = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 24px;
  line-height: 32px;
  margin: 40px 0;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
