import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Form } from '@unform/mobile';

interface IconProps {
  remember: boolean;
}

interface InputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 0 ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px 40px 20px 40px;
  background: #8257e5;
`;

export const Logo = styled.Image`
  width: 80%;
  height: 20%;
`;

export const LogoDescription = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #d4c2ff;
  font-size: 15px;
  line-height: 30px;
  margin-top: 15px;
`;

export const Banner = styled.Image``;

export const Forms = styled(Form)`
  background: #f0f0f7;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin-bottom: auto;
`;

export const TitleBlock = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 24px;
  line-height: 34px;
`;

export const Create = styled.TouchableOpacity``;

export const CreateCount = styled.Text`
  color: #8257e5;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  line-height: 24px;
`;

export const Footer = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const Remember = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const RememberButton = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Icon = styled(Feather)<IconProps>`
  background: ${props => (props.remember ? '#04d361' : '#fff')};
  padding: 5px;
  border-radius: 8px;
  margin-right: 5px;
  color: #ffffff;
`;

export const RememberButtonText = styled.Text`
  margin-top: auto;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: #9c98a6;
`;

export const Forgot = styled.TouchableOpacity``;

export const ForgotText = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: #9c98a6;
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
