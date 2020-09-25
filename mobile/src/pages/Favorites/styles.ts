import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #f0f0f7;
`;

export const Scroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
})`
  margin-top: -40px;
`;

export const Text = styled.Text`
  margin: 100px auto;
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  color: #6a6180;
`;
