import React, { useCallback, ReactNode } from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Content,
  TopBar,
  TitleBar,
  Button,
  Title,
  Header,
} from './styles';

interface PageHeaderProps {
  title?: string;
  titleBar?: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  titleBar,
  headerRight,
  children,
}) => {
  const { signOut } = useAuth();

  const handleGoBack = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <TopBar>
        <Button onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </Button>

        {titleBar && <TitleBar>{titleBar}</TitleBar>}

        <Image source={logoImg} resizeMode="contain" />
      </TopBar>

      <Content>
        {title && (
          <Header>
            <Title>{title}</Title>
            {headerRight}
          </Header>
        )}

        {children}
      </Content>
    </Container>
  );
};

export default PageHeader;
