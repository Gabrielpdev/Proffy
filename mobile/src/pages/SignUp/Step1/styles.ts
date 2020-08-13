import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import Input from '../../../components/Input';

interface ButtonsProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 0px 30px ${Platform.OS === 'android' ? 20 : 40}px;
`;

export const Header = styled.View`
  margin-top: 40px;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Icon = styled.TouchableOpacity``;

export const HeaderRight = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 15px;
`;

export const Dot1 = styled.View`
  background: #8257e5;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
`;

export const Dot2 = styled.View`
  background: #c1bccc;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
`;

export const Title = styled.Text`
  margin-top: 100px;
  font-family: 'Poppins_600SemiBold';
  font-size: 35px;
  line-height: 42px;
`;

export const Description = styled.Text`
  margin-top: 20px;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 24px;
  color: #6a6180;
`;

export const Form = styled.View`
  margin-top: 27%;
`;

export const FormQuestion1 = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 24px;
  line-height: 26px;
  margin-bottom: 10px;
  color: #32264d;
`;

export const TextArena = styled(Input)``;

export const FormQuestion2 = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 23px;
  line-height: 26px;
  margin: 10px 0;
  color: #32264d;
`;

export const FormFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const FormButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  background: #04d361;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
`;

export const FormButtonText = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 16px;
  color: #fff;
`;
