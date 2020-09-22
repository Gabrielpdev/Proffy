import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface FavoriteButtonProps {
  favorite: boolean;
}

export const Container = styled.View`
  background: #fff;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px;
`;

export const ImageProfile = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const ProfileInfo = styled.View`
  margin-left: 16px;
`;

export const Name = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #32264d;
  font-size: 20px;
`;

export const Subject = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #6a6180;
  font-size: 12px;
  margin-top: 4px;
`;

export const Bio = styled.Text`
  margin: 0 24px;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 24px;
  color: #6a6180;
  padding-bottom: 20px;
`;

export const Schedule = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-top-color: #e6e6f0;
`;

export const DaysHeader = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 7px 40px;
`;

export const Days = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;

  background: #f7f8fa;
  border-radius: 8px;
  border: 1px solid #e6e6f0;
`;

export const DaysContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 10px 15px;
`;

export const DaysHeaderDay = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 11px;
  line-height: 15px;
  color: #9c98a6;
`;

export const DaysHeaderHour = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 11px;
  line-height: 15px;
  color: #9c98a6;
`;

export const DayName = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 16px;
  line-height: 21px;
  color: #6a6180;
`;

export const Hour = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 16px;
  line-height: 21px;
  color: #6a6180;
`;

export const Footer = styled.View`
  background: #fafafc;
  padding: 24px;
  align-items: center;
  margin-top: 24px;
  border-top-width: 1px;
  border-top-color: #e6e6f0;
`;

export const Price = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #6a6180;
  font-size: 14px;
`;

export const PriceValue = styled.Text`
  font-family: 'Archivo_700Bold';
  color: #8257e5;
  font-size: 16px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const FavoriteButton = styled(RectButton)<FavoriteButtonProps>`
  background: ${props => (props.favorite ? '#e33d3d' : '#8257e5')};
  width: 56px;
  height: 56px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const ContactButton = styled(RectButton)`
  background: #04d361;
  flex: 1;
  height: 56px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const ContactButtonText = styled.Text`
  color: #fff;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
  margin-left: 16px;
`;
