import React, { useCallback, useEffect, useState } from 'react';
import { Image, Linking } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

import heartIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import userImg from '../../assets/images/user.png';

import {
  Container,
  Profile,
  ImageProfile,
  ProfileInfo,
  Name,
  Subject,
  Bio,
  Schedule,
  Days,
  DaysContent,
  DaysHeader,
  DaysHeaderDay,
  DaysHeaderHour,
  DayName,
  Hour,
  Footer,
  Price,
  PriceValue,
  ButtonsContainer,
  FavoriteButton,
  ContactButton,
  ContactButtonText,
} from './styles';
import { useAuth } from '../../hooks/auth';

export interface Week_Day {
  id: string;
  name: string;
}
interface Class_Schedule {
  id: string;
  from: number;
  to: number;
  fromFormatted: string;
  toFormatted: string;
  week_day: Week_Day;
  is_available: boolean;
}
export interface Favorite {
  id: string;
  favorite_id: string;
  cost: string;
  subject: {
    name: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    bio: string;
    is_teacher: boolean;
    avatar_url: string;
    favorites: [Favorite];
  };
  class_schedule: [Class_Schedule];
}

interface TeacherItemProps {
  classe: Classes;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ classe }) => {
  const { favorites, updateFavorites } = useAuth();

  const [isFavorited, setIsFavorited] = useState(false);

  const [days, setDays] = useState<Week_Day[]>([]);
  const [class_schedules, setClassSchedules] = useState<Class_Schedule[]>([]);

  useEffect(() => {
    api.get('/days').then(response => {
      setDays(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(favorites);
    if (favorites[0]) {
      favorites.forEach(favorite => {
        if (favorite.id === classe.id) {
          setIsFavorited(true);
        }
      });
    } else {
      setIsFavorited(false);
    }
  }, [classe.id, favorites]);

  useEffect(() => {
    const classeFormatted = classe.class_schedule.map(
      (class_schedule: Class_Schedule) => {
        return {
          ...class_schedule,
          fromFormatted: convertMinutesToHour(class_schedule.from),
          toFormatted: convertMinutesToHour(class_schedule.to),
        };
      },
    );
    setClassSchedules(classeFormatted);
  }, [classe.class_schedule]);

  const handleLinkToWhatsapp = useCallback(() => {
    api.post('/connections', {
      teacher_id: classe.user.id,
    });

    Linking.openURL(`whatsapp://send?phone=+55${classe.user.whatsapp}`);
  }, [classe.user.whatsapp, classe.user.id]);

  const handleToggleFavorite = useCallback(async () => {
    if (isFavorited) {
      const favorite = favorites.find(item => item.id === classe.id);

      api.delete(`/favorite/${favorite?.favorite_id}`).then(response => {
        updateFavorites(response.data);
        setIsFavorited(false);
      });
    } else {
      api
        .post('/favorite', {
          class_id: classe.id,
        })
        .then(response => {
          updateFavorites(response.data);
          setIsFavorited(true);
        });
    }
  }, [isFavorited, classe, favorites, updateFavorites]);

  return (
    <Container>
      <Profile>
        {classe.user.avatar_url ? (
          <ImageProfile
            source={{
              uri: classe.user.avatar_url.replace('localhost', '192.168.0.112'),
            }}
          />
        ) : (
          <ImageProfile source={userImg} />
        )}

        <ProfileInfo>
          <Name>{classe.user.name}</Name>
          <Subject>{classe.subject.name}</Subject>
        </ProfileInfo>
      </Profile>

      <Bio>{classe.user.bio}</Bio>

      <Schedule>
        <DaysHeader>
          <DaysHeaderDay>Dia</DaysHeaderDay>
          <DaysHeaderHour>Horário</DaysHeaderHour>
        </DaysHeader>
        {days.map(day => {
          const available = class_schedules.find(
            class_schedule => class_schedule.week_day.name === day.name,
          );

          if (!available) {
            return (
              <Days key={day.id} style={{ opacity: 0.4 }}>
                <DaysContent>
                  <DayName>{day.name}</DayName>
                  <Hour>----</Hour>
                </DaysContent>
              </Days>
            );
          }

          return (
            <Days key={day.id}>
              <DaysContent>
                <DayName>{day.name}</DayName>
                <Hour>{`${available.fromFormatted}h - ${available.toFormatted}h`}</Hour>
              </DaysContent>
            </Days>
          );
        })}
      </Schedule>

      <Footer>
        <Price>
          Preço/hora
          <PriceValue>
            {' '}
            R$
            {classe.cost}
          </PriceValue>
        </Price>

        <ButtonsContainer>
          <FavoriteButton favorite={isFavorited} onPress={handleToggleFavorite}>
            {isFavorited === true ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartIcon} />
            )}
          </FavoriteButton>

          <ContactButton onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
