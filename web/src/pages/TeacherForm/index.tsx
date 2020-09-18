import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { Week_Day } from '../../components/TeacherItem';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';

import Select from '../../components/Select';
import { api } from '../../services/api';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  DataContent,
  ScheduleItem,
  WarningContent,
} from './styles';

interface SubjectProps {
  id: string;
  name: string;
}

interface scheduleItensProps {
  week_day_id: string;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const { push } = useHistory();
  const { addToast } = useToast();

  const [subject_id, setSubjectId] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItens, setScheduleItens] = useState<scheduleItensProps[]>([
    { week_day_id: '', from: '', to: '' },
  ]);

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

  const addNewScheduleItem = useCallback(() => {
    setScheduleItens([...scheduleItens, { week_day_id: '', from: '', to: '' }]);
  }, [scheduleItens]);

  const addNewScheduleCreateClass = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      api
        .post('/classes', {
          subject_id,
          cost,
          schedule: scheduleItens,
        })
        .then(() => {
          addToast({
            type: 'success',
            title: 'Cadastro realizado.',
            description: 'Agora é só esperar seu alunos te chamarem',
          });

          push('/dashboard');
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao cadastrar, tente novamente.',
          });
        });
    },
    [subject_id, cost, scheduleItens, push, addToast],
  );

  const setScheduleItemValue = useCallback(
    (position: number, field: string, value: string) => {
      const updatedScheduleItens = scheduleItens.map((scheduleItem, index) => {
        if (position === index) {
          return {
            ...scheduleItem,
            [field]: value,
          };
        }

        return scheduleItem;
      });

      setScheduleItens(updatedScheduleItens);
    },
    [scheduleItens],
  );

  return (
    <Container>
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulários de inscrição."
        secondDescriptionIcon={rocketIcon}
        secondDescription="Prepare-se vai ser o máximo !"
      />

      <Content onSubmit={addNewScheduleCreateClass}>
        <DataContent>
          <legend>Sobre a aula</legend>

          <Select
            name="subject"
            title="Matéria"
            value={subject_id}
            onChange={(e) => setSubjectId(e.target.value)}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
          />
          <Input
            name="cost"
            title="Custo da sua hora por aula"
            value={cost}
            mask=""
            type="number"
            onChange={(e) => setCost(e.target.value)}
          />
        </DataContent>

        <DataContent>
          <legend>
            Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
              + Novo horários
            </button>
          </legend>
          {scheduleItens.map((scheduleItem, index) => (
            <ScheduleItem key={scheduleItem.week_day_id}>
              <Select
                name="week_day"
                title="Dia da semana"
                value={scheduleItem.week_day_id}
                onChange={(e) => {
                  setScheduleItemValue(index, 'week_day_id', e.target.value);
                }}
                options={days.map((day) => ({
                  value: day.id,
                  label: day.name,
                }))}
              />

              <Input
                name="from"
                title="Dás"
                type="time"
                value={scheduleItem.from}
                mask=""
                onChange={(e) => {
                  setScheduleItemValue(index, 'from', e.target.value);
                }}
              />
              <Input
                name="to"
                title="Até"
                type="time"
                value={scheduleItem.to}
                mask=""
                onChange={(e) => {
                  setScheduleItemValue(index, 'to', e.target.value);
                }}
              />
            </ScheduleItem>
          ))}
        </DataContent>
        <WarningContent>
          <p>
            <img src={warningIcon} alt="Aviso Icone" />
            Importante ! <br />
            Preencha todos os dados
          </p>

          <button type="submit">Salvar Cadastro</button>
        </WarningContent>
      </Content>
    </Container>
  );
};

export default TeacherForm;
