import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ContentProps {
  isFocused: boolean;
  textArena: boolean;
}

export const Container = styled.View``;

export const Title = styled.Text`
  color: #8257e5;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 24px;
  text-align: left;
`;

export const Content = styled.View<ContentProps>`
  width: 100%;
  height: ${props => (props.textArena ? '120px' : '60px')};

  padding: 0 16px;
  background: #fafafc;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #f0f0f7;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #8257e5;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #6a6180;
  font-size: 16px;
  font-family: 'Poppins_400Regular';
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
