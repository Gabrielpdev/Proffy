import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';

interface IconProps {
  remember: boolean;
}

interface InputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 0 0 ${Platform.OS === 'android' ? 310 : 40}px;
`;

export const Background = styled.ImageBackground`
  height: 70%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #8257e5;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  height: 70px;
  width: 200px;
`;

export const LogoDescription = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #d4c2ff;
  font-size: 15px;
  line-height: 30px;
  margin-top: 15px;
`;

export const Form = styled.View`
  background: #f0f0f7;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const Icon = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const TitleBlock = styled.View`
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-top: 31px;
  align-self: flex-start;
  font-family: 'Poppins_600SemiBold';
  font-size: 24px;
  line-height: 34px;
  color: #32264d;
`;

export const Description = styled.Text`
  margin-top: 16px;
  margin-bottom: 40px;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 24px;
  color: #6a6180;
  align-self: flex-start;
`;

export const Button = styled(RectButton)`
  align-items: center;
  justify-content: center;
  margin-top: 24px;
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
