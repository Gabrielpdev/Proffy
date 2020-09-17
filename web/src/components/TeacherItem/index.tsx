import React, { useCallback, useEffect, useState } from 'react';
import wppIcon from '../../assets/images/icons/whatsapp.svg';

import { Container } from './styles';
import { api } from '../../services/api';
import convertMinutesToHour from '../../utils/convertMinutesToHour';

interface Week_Day {
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
  const [days, setDays] = useState<Week_Day[]>([]);
  const [class_schedules, setClassSchedules] = useState<Class_Schedule[]>([]);

  useEffect(() => {
    api.get('/days').then((response) => {
      setDays(response.data);
    });

    const classeFormatted = classe.class_schedule.map((class_schedule) => {
      return {
        ...class_schedule,
        fromFormatted: convertMinutesToHour(class_schedule.from),
        toFormatted: convertMinutesToHour(class_schedule.to),
      };
    });
    setClassSchedules(classeFormatted);
  }, [classe.class_schedule]);

  const createNewConnection = useCallback(() => {
    api.post('/connections', {
      teacher_id: classe.user.id,
    });
  }, [classe.user.id]);

  return (
    <Container>
      <header>
        <img src={classe.user.avatar_url} alt={classe.user.name} />

        <div>
          <strong>{classe.user.name}</strong>
          <span>{classe.subject.name}</span>
        </div>
      </header>

      <div>
        <p>{classe.user.bio}</p>

        <div className="schedule">
          {days.map((day) => {
            const available = class_schedules.find(
              (class_schedule) => class_schedule.week_day.name === day.name,
            );

            if (!available) {
              return (
                <div className="day" key={day.id} style={{ opacity: 0.4 }}>
                  <span>Dia</span>
                  <strong className="nameDay">{day.name}</strong>
                  <span>Horário</span>
                  <strong>-</strong>
                </div>
              );
            }

            return (
              <div className="day" key={day.id}>
                <span>Dia</span>
                <strong className="nameDay">{day.name}</strong>
                <span>Horário</span>
                <strong>
                  {available.fromFormatted}h - {available.toFormatted}h
                </strong>
              </div>
            );
          })}
        </div>
      </div>

      <footer>
        <p>
          Preço/hora
          <strong>R${classe.cost}</strong>
        </p>

        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://api.whatsapp.com/send?phone=+55${classe.user.whatsapp}`}
        >
          <img src={wppIcon} alt="whatsapp" />
          Entrar em contato.
        </a>
      </footer>
    </Container>
  );
};

export default TeacherItem;
