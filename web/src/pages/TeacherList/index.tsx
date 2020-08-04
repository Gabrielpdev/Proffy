import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import { Container, SearchForm } from './styles';

const TeacherList: React.FC = () => {
  return (
  <Container>
    <PageHeader title='Esse são os proffys disponíveis.'>
      <SearchForm>
        <div className="input-block">
          <label htmlFor="subject">Matéria</label>
          <input type="text" id='subject'/>
        </div>

        <div className="input-block">
          <label htmlFor="week-day">Dia da semana</label>
          <input type="text" id='week-day'/>
        </div>

        <div className="input-block">
          <label htmlFor="time">Hora</label>
          <input type="text" id='time'/>
        </div>
      </SearchForm>
    </PageHeader>

    <main>
      <TeacherItem/>
      <TeacherItem/>
      <TeacherItem/>
      <TeacherItem/>
    </main>
  </Container>
  );
}

export default TeacherList;