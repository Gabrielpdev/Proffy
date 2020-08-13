import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View`
  flex: 1;
  background: #f0f0f7;
`;

export const FilterButton = styled(BorderlessButton)``;

export const Scroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
})`
  margin-top: -40px;
`;

export const SearchForm = styled.View`
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  color: #d4c2ff;
  font-family: 'Poppins_400Regular';
`;

export const Input = styled(TextInputMask)`
  height: 54px;
  background: #fff;
  justify-content: center;
  padding: 0 16px;
  margin-top: 4px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

export const PickerView = styled.View`
  height: 54px;
  background: #fff;
  justify-content: center;
  padding: 0 16px;
  margin-top: 4px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputBlock = styled.View`
  width: 48%;
`;

export const SubmitButton = styled(RectButton)`
  background: #04d361;
  height: 56px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
`;
