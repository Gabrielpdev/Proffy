import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

interface ButtonsProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 0 ${Platform.OS === 'android' ? 24 : 40}px;
`;

export const ScheduleItem = styled.View`
  border-top-width: 1px;
  border-top-color: #e6e6f0;
  padding: 32px 0;
`;

export const TitleSchedule = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
`;

export const DeleteSchedule = styled(BorderlessButton)``;

export const Form = styled.View`
  margin: -50px 20px 0 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e6e6f0;
  elevation: 4;
`;

export const FormContent = styled.View`
  padding: 0 20px;
`;

export const TitleGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled.TouchableOpacity``;

export const DescriptionText = styled.Text`
  color: #8257e5;
  font-family: 'Archivo_700Bold';
  font-size: 14px;
  line-height: 26px;
`;

export const TitleForm = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 20px;
  line-height: 30px;
  color: #32264d;
  margin: 24px 0;
`;

export const ImageIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const PickerView = styled.View`
  height: 56px;
  background: #fafafc;
  justify-content: center;
  padding: 0 16px;
  margin-top: 4px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #e6e6f0;
`;

export const Label = styled.Text`
  color: #9c98a6;
  font-family: 'Poppins_400Regular';
`;

export const InputGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled(RectButton)`
  align-items: center;
  justify-content: center;
  margin-top: 25px;
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

export const Footer = styled.View`
  padding: 0 20px;
  margin-top: 8px;

  flex-direction: column;
  align-items: center;
  background: #fafafc;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-width: 1px;
  border-top-color: #e6e6f0;
`;

export const Icon = styled.Image`
  margin-right: 16px;
`;

export const FooterAlert = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 24px 0;
`;

export const FooterAlertTextView = styled.View`
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const FooterAlertTitle = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #8257e5;
  font-size: 12px;
  line-height: 20px;
`;

export const FooterAlertDescription = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #a0a0b3;
  font-size: 12px;
  line-height: 20px;
`;
