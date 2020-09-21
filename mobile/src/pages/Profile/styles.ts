import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import Input from '../../components/Input';

interface ButtonsProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 0 ${Platform.OS === 'android' ? 24 : 40}px;
`;

export const Background = styled.ImageBackground`
  flex: 1;
`;

export const AvatarContainer = styled.View`
  margin-top: 20px;
  position: relative;
`;

export const UserAvatarButton = styled(RectButton)`
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #04d361;

  position: absolute;
  bottom: 0;
  right: 22%;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 24px;
  line-height: 25px;
  color: #f4ede8;
  margin: 24px 0 50px 0;
  align-self: center;
  font-family: 'Archivo_700Bold';
`;

export const Forms = styled(Form)`
  margin: -50px 20px 0 20px;
  padding: 0 20px;
  background: #fff;
  border-radius: 8px;
`;

export const TitleForm = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 20px;
  line-height: 30px;
  color: #32264d;
  margin: 25px 0;
`;

export const TextArena = styled(Input)``;

export const FormFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const BottonsTittle = styled.Text`
  color: #9c98a6;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 24px;
  text-align: left;
`;

export const StudyButton = styled(RectButton)<ButtonsProps>`
  height: 40px;
  width: 48%;
  border-radius: 8px;
  padding: 24px 32px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: ${props => (props.isSelected ? '#9871f5' : '#CDBCF5')};
`;

export const TeacherButton = styled(RectButton)<ButtonsProps>`
  height: 40px;
  width: 48%;
  border-radius: 8px;
  padding: 24px 32px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: ${props => (props.isSelected ? '#04d361' : '#B1E6C8')};
`;

export const ImageIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const TextButton = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #fff;
  font-size: 14px;
`;

export const Button = styled(RectButton)`
  align-items: center;
  justify-content: center;
  margin: 24px 0;
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
