import React, { useState, useCallback, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import rocketIcon from '../../assets/images/icons/rocket.svg';

import { api } from '../../services/api';

import { Container, SearchForm } from './styles';
import { useToast } from '../../hooks/toast';

const TeacherList: React.FC = () => {
  const { addToast } = useToast();

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get('teachers').then((response) => {
      setTotal(response.data.total);
    });
  }, []);

  useEffect(() => {
    api
      .get('/classes', {
        params: {
          week_day,
          subject,
          time,
        },
      })
      .then((response) => {
        setTeachers(response.data);
      });
  }, []);

  const searchTeachers = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (week_day !== '' && subject !== '' && time !== '') {
        api
          .get('/classes', {
            params: {
              week_day,
              subject,
              time,
            },
          })
          .then((response) => {
            setTeachers(response.data);
          });
      } else {
        addToast({
          type: 'error',
          title: 'Erro na busca',
          description:
            'Ocorreu um erro na busca, preencha todos do dados para buscar.',
        });
      }
    },
    [week_day, subject, time, teachers],
  );
  return (
    <Container>
      <PageHeader
        title="Esse são os proffys disponíveis."
        titleDescription={`Nós temos ${total} Professores`}
        titleDescriptionIcon={rocketIcon}
      >
        <SearchForm onSubmit={searchTeachers}>
          <Select
            name="subject"
            title="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Português', label: 'Português' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Geografia', label: 'Geografia' },
            ]}
          />

          <Select
            name="week-day"
            title="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-Feira' },
              { value: '2', label: 'Terça-Feira' },
              { value: '3', label: 'Quarta-Feira' },
              { value: '4', label: 'Quinta-Feira' },
              { value: '5', label: 'Sexta-Feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            name="time"
            title="Hora"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit">Buscar</button>
        </SearchForm>
      </PageHeader>

      <main>
        {teachers[0] ? (
          teachers.map((teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <p>
            Nenhum professor encontrado com <br />a sua pesquisa
          </p>
        )}
      </main>
    </Container>
  );
};

export default TeacherList;
