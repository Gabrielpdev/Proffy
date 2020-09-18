import React, { useState, useCallback, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Classes, Week_Day } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import rocketIcon from '../../assets/images/icons/rocket.svg';

import { api } from '../../services/api';

import { Container, SearchForm } from './styles';
import { useToast } from '../../hooks/toast';

interface SubjectProps {
  id: string;
  name: string;
}

const TeacherList: React.FC = () => {
  const { addToast } = useToast();

  const [subject_id, setSubjectId] = useState('');
  const [week_day_id, setWeekDayId] = useState('');
  const [time, setTime] = useState('');

  const [classes, setClasses] = useState<Classes[]>([]);
  const [total, setTotal] = useState(0);

  const [days, setDays] = useState<Week_Day[]>([]);
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);

  useEffect(() => {
    api.get('/days').then((response) => {
      setDays(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/subjects').then((response) => {
      setSubjects(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/teachers').then((response) => {
      setTotal(response.data.total);
    });
  }, []);

  useEffect(() => {
    api.get('/classes').then((response) => {
      setClasses(response.data);
    });
  }, []);

  const searchTeachers = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      api
        .get('/classes', {
          params: {
            week_day_id,
            subject_id,
            hour: time,
          },
        })
        .then((response) => {
          setClasses(response.data);
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro na busca',
            description:
              'Ocorreu um erro na busca, preencha todos do dados para buscar.',
          });
        });
    },
    [week_day_id, subject_id, time, addToast],
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
            value={subject_id}
            onChange={(e) => {
              setSubjectId(e.target.value);
            }}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
          />

          <Select
            name="week-day"
            title="Dia da semana"
            value={week_day_id}
            onChange={(e) => {
              setWeekDayId(e.target.value);
            }}
            options={days.map((day) => ({ value: day.id, label: day.name }))}
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
        {classes[0] ? (
          classes.map((classe) => (
            <TeacherItem key={classe.id} classe={classe} />
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
