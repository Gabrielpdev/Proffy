import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import { Container, Scroll, Text } from './styles';
import { useAuth } from '../../hooks/auth';

const Favorites: React.FC = () => {
  const { favorites } = useAuth();

  return (
    <Container>
      <PageHeader
        title={`Meus proffys${'\n'}favoritos.`}
        titleBar="Favoritos"
      />
      <Scroll>
        {favorites[0] ? (
          favorites.map(classe => (
            <TeacherItem key={classe.id} classe={classe} />
          ))
        ) : (
          <Text>Vocẽ não tem Proffys favoritados</Text>
        )}
      </Scroll>
    </Container>
  );
};

export default Favorites;
