import React, { useState, useCallback } from 'react';
import { Picker } from '@react-native-community/picker';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

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

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isFiltersVisible, setIsFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritesTeachers = JSON.parse(response);
        const favoritesTeachersIds = favoritesTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          },
        );
        setFavorites(favoritesTeachersIds);
      }
    });
  }, []);

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFilterVisible(state => !state);
  }, []);

  const handleFiltersSubmit = useCallback(() => {
    loadFavorites();
    api
      .get('/classes', {
        params: {
          week_day,
          subject,
          time,
        },
      })
      .then(response => {
        setIsFilterVisible(false);
        setTeachers(response.data);
        setSubject('');
        setWeekDay('');
        setTime('');
      });
  }, [week_day, subject, time, loadFavorites]);

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
                      selectedValue={subject}
                      onValueChange={itemValue => setSubject(String(itemValue))}
                    >
                      <Picker.Item
                        label="Selecione uma matéria"
                        value=""
                        color="#c1bccc"
                      />
                      <Picker.Item label="Português" value="Português" />
                      <Picker.Item label="Matemática" value="Matemática" />
                      <Picker.Item label="Geografia" value="Geografia" />
                      <Picker.Item label="Historia" value="Historia" />
                      <Picker.Item label="Biologia" value="Biologia" />
                      <Picker.Item label="Química" value="Química" />
                      <Picker.Item label="Artes" value="Artes" />
                    </Picker>
                  </PickerView>

                  <InputGroup>
                    <InputBlock>
                      <Label>Dia da semana</Label>
                      <PickerView>
                        <Picker
                          selectedValue={week_day}
                          onValueChange={itemValue =>
                            // eslint-disable-next-line prettier/prettier
                            setWeekDay(String(itemValue))}
                        >
                          <Picker.Item
                            label="Selecione um dia"
                            value=""
                            color="#c1bccc"
                          />
                          <Picker.Item label="Domingo" value="0" />
                          <Picker.Item label="Segunda" value="1" />
                          <Picker.Item label="Terça" value="2" />
                          <Picker.Item label="Quarta" value="3" />
                          <Picker.Item label="Quinta" value="4" />
                          <Picker.Item label="Sexta" value="5" />
                          <Picker.Item label="Sábado" value="6" />
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
                        value={time}
                        onChangeText={text => setTime(text)}
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
                <TeacherItem
                  key={teacher.id}
                  teacher={teacher}
                  favorited={favorites.includes(teacher.id)}
                />
              ))}
            </Scroll>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default TeacherList;
