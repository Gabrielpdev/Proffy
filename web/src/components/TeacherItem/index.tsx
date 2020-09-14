import React, { useCallback } from 'react';
import wppIcon from '../../assets/images/icons/whatsapp.svg';

import { Container } from './styles';
import { api } from '../../services/api';

export interface Schedule {
  id: string;
  class: {
    cost: string;
    subject_id: string;
    user: {
      id: string;
      name: string;
      email: string;
      whatsapp: string;
      bio: string;
      is_teacher: boolean;
      avatar_url: string;
    };
  };
}
interface TeacherItemProps {
  schedule: Schedule;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ schedule }) => {
  const createNewConnection = useCallback(() => {
    api.post('/connections', {
      teacher_id: schedule.class.user.id,
    });
  }, [schedule.class.user.id]);

  return (
    <Container>
      <header>
        <img src={schedule.class.user.avatar_url} alt="gabriel" />

        <div>
          <strong>{schedule.class.user.name}</strong>
          <span>{schedule.class.subject_id}</span>
        </div>
      </header>
      <p>{schedule.class.user.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R${schedule.class.cost}</strong>
        </p>

        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://api.whatsapp.com/send?phone=+55${schedule.class.user.whatsapp}`}
        >
          <img src={wppIcon} alt="whatsapp" />
          Entrar em contato.
        </a>
      </footer>
    </Container>
  );
};

export default TeacherItem;
