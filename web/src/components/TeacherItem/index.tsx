import React, { useCallback } from 'react';
import wppIcon from '../../assets/images/icons/whatsapp.svg';

import { Container } from './styles';
import { api } from '../../services/api';

export interface Teacher {
  id: string;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}
interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createNewConnection = useCallback(() => {
    api.post('/connections', {
      user_id: teacher.id,
    });
  }, [teacher.id]);

  return (
    <Container>
      <header>
        <img src={teacher.avatar} alt="gabriel" />

        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R${teacher.cost}</strong>
        </p>

        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://api.whatsapp.com/send?phone=+55${teacher.whatsapp}`}
        >
          <img src={wppIcon} alt="whatsapp" />
          Entrar em contato.
        </a>
      </footer>
    </Container>
  );
};

export default TeacherItem;
