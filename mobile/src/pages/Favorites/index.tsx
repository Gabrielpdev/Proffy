import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Classes } from '../../components/TeacherItem';
import api from '../../services/api';

import { Container, Scroll } from './styles';

const Favorites: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState<Classes[]>([]);

  useFocusEffect(
    useCallback(() => {
      api.get('/favorite').then(response => {
        setFavoriteList(response.data);
      });
    }, []),
  );

  return (
    <Container>
      <PageHeader
        title={`Meus proffys${'\n'}favoritos.`}
        titleBar="Favoritos"
      />
      <Scroll>
        {favoriteList.map(classe => (
          <TeacherItem key={classe.id} classe={classe} />
        ))}
      </Scroll>
    </Container>
  );
};

export default Favorites;
