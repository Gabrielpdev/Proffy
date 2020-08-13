import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

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

interface scheduleItensProps {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const { push } = useHistory();
  const { addToast } = useToast();

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItens, setScheduleItens] = useState<scheduleItensProps[]>([
    { week_day: 0, from: '', to: '' },
  ]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItens([...scheduleItens, { week_day: 0, from: '', to: '' }]);
  }, [scheduleItens]);

  const addNewScheduleCreateClass = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      api
        .post('/classes', {
          subject,
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
    [subject, cost, scheduleItens, push, addToast],
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Português', label: 'Português' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Historia', label: 'Historia' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Química', label: 'Biologia' },
              { value: 'Artes', label: 'Artes' },
            ]}
          />
          <Input
            name="cost"
            title="Custo da sua hora por aula"
            value={cost}
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
            <ScheduleItem key={scheduleItem.week_day}>
              <Select
                name="week_day"
                title="Dia da semana"
                value={scheduleItem.week_day}
                onChange={(e) => {
                  setScheduleItemValue(index, 'week_day', e.target.value);
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
                name="from"
                title="Dás"
                type="time"
                value={scheduleItem.from}
                onChange={(e) => {
                  setScheduleItemValue(index, 'from', e.target.value);
                }}
              />
              <Input
                name="to"
                title="Até"
                type="time"
                value={scheduleItem.to}
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
