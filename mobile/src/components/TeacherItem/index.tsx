import React, { useCallback, useEffect, useState } from 'react';
import { Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

import heartIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

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
export interface Classes {
  id: string;
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
  };
  class_schedule: [Class_Schedule];
}

interface TeacherItemProps {
  classe: Classes;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ classe }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const [days, setDays] = useState<Week_Day[]>([]);
  const [class_schedules, setClassSchedules] = useState<Class_Schedule[]>([]);

  useEffect(() => {
    api.get('/days').then(response => {
      setDays(response.data);
    });

    const classeFormatted = classe.class_schedule.map(class_schedule => {
      return {
        ...class_schedule,
        fromFormatted: convertMinutesToHour(class_schedule.from),
        toFormatted: convertMinutesToHour(class_schedule.to),
      };
    });
    setClassSchedules(classeFormatted);
  }, [classe.class_schedule]);

  const handleLinkToWhatsapp = useCallback(() => {
    api.post('/connections', {
      teacher_id: classe.user.id,
    });
  }, [classe.user.id]);

  //   Linking.openURL(`whatsapp://send?phone=+55${classe.user.whatsapp}`);
  // }, [classe.user.whatsapp, classe.user.id]);

  // const handleToggleFavorite = useCallback(async () => {
  //   const favorites = await AsyncStorage.getItem('favorites');

  //   let favoritesArray = [];

  //   if (favorites) {
  //     favoritesArray = JSON.parse(favorites);
  //   }

  //   if (isFavorited) {
  //     const favoriteIndex = favoritesArray.findIndex((teacherItem: Classes) => {
  //       return teacherItem.id === classe.user.id;
  //     });

  //     favoritesArray.splice(favoriteIndex, 1);

  //     setIsFavorited(false);
  //   } else {
  //     favoritesArray.push(classe.user);

  //     setIsFavorited(true);
  //   }

  //   await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  // }, [isFavorited, classe]);

  return (
    <Container>
      <Profile>
        <ImageProfile
          source={{
            uri: classe.user.avatar_url.replace('localhost', '192.168.0.112'),
          }}
        />

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
          <FavoriteButton favorite={isFavorited}>
            {isFavorited === true ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartIcon} />
            )}
          </FavoriteButton>

          <ContactButton>
            <Image source={whatsappIcon} onPress={handleLinkToWhatsapp} />
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
