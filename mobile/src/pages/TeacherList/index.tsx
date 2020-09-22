import React, { useState, useCallback, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Classes } from '../../components/TeacherItem';

import {
  Container,
  FilterButton,
  Scroll,
  SearchForm,
  Label,
  Input,
  PickerView,
  InputGroup,
  InputBlock,
  SubmitButton,
  SubmitButtonText,
} from './styles';

interface SubjectAndDaysProps {
  id: string;
  name: string;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Classes[]>([]);
  const [isFiltersVisible, setIsFilterVisible] = useState(false);

  const [subject_id, setSubject] = useState('');
  const [week_day_id, setWeekDay] = useState('');
  const [hour, setHour] = useState('');

  const [subjectOptions, setSubjectOptions] = useState<SubjectAndDaysProps[]>(
    [],
  );
  const [daysOptions, setDaysOptions] = useState<SubjectAndDaysProps[]>([]);

  useEffect(() => {
    api.get('/subjects').then(response => {
      setSubjectOptions(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/days').then(response => {
      setDaysOptions(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/classes').then(response => {
      setTeachers(response.data);
    });
  }, []);

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFilterVisible(state => !state);
  }, []);

  const handleFiltersSubmit = useCallback(() => {
    api
      .get('/classes', {
        params: {
          week_day_id,
          subject_id,
          hour,
        },
      })
      .then(response => {
        setTeachers(response.data);
        setIsFilterVisible(false);
        setSubject('');
        setWeekDay('');
        setHour('');
      });
  }, [week_day_id, subject_id, hour]);

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <PageHeader
              title={`Proffys${'\n'}disponíveis.`}
              titleBar="Proffys"
              // eslint-disable-next-line prettier/prettier
              headerRight={(
                <FilterButton onPress={handleToggleFiltersVisible}>
                  <Feather name="filter" size={25} color="#fff" />
                </FilterButton>
                // eslint-disable-next-line prettier/prettier
              )}
            >
              {isFiltersVisible && (
                <SearchForm>
                  <Label>Matéria</Label>
                  <PickerView>
                    <Picker
                      selectedValue={subject_id}
                      onValueChange={itemValue => setSubject(String(itemValue))}
                    >
                      <Picker.Item
                        label="Selecione uma matéria"
                        value=""
                        color="#c1bccc"
                      />
                      {subjectOptions.map(item => (
                        <Picker.Item
                          label={item.name}
                          key={item.id}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  </PickerView>

                  <InputGroup>
                    <InputBlock>
                      <Label>Dia da semana</Label>
                      <PickerView>
                        <Picker
                          selectedValue={week_day_id}
                          onValueChange={itemValue =>
                            setWeekDay(String(itemValue))}
                        >
                          <Picker.Item
                            label="Selecione um dia"
                            value=""
                            color="#c1bccc"
                          />
                          {daysOptions.map(day => (
                            <Picker.Item
                              label={day.name}
                              key={day.id}
                              value={day.id}
                            />
                          ))}
                        </Picker>
                      </PickerView>
                    </InputBlock>
                    <InputBlock>
                      <Label>Horário</Label>
                      <Input
                        type="custom"
                        options={{
                          mask: '99:99',
                        }}
                        keyboardType="numeric"
                        maxLength={5}
                        placeholder="Qual horário ?"
                        placeholderTextColor="#c1bccc"
                        value={hour}
                        onChangeText={text => setHour(text)}
                      />
                    </InputBlock>
                  </InputGroup>

                  <SubmitButton onPress={handleFiltersSubmit}>
                    <SubmitButtonText>Filtrar</SubmitButtonText>
                  </SubmitButton>
                </SearchForm>
              )}
            </PageHeader>

            <Scroll>
              {teachers.map(teacher => (
                <TeacherItem key={teacher.id} classe={teacher} />
              ))}
            </Scroll>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default TeacherList;
