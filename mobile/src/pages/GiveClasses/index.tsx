import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Feather } from '@expo/vector-icons';

// import Input from '../../components/Input';
import InputMask from '../../components/Input';

import attentionIcon from '../../assets/images/atention.png';

import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import {
  Container,
  Forms,
  ScheduleItem,
  TitleSchedule,
  Label,
  DeleteSchedule,
  FormContent,
  TitleGroup,
  TitleForm,
  Description,
  DescriptionText,
  PickerView,
  InputGroup,
  Footer,
  Button,
  ButtonText,
  Icon,
  FooterAlert,
  FooterAlertTextView,
  FooterAlertTitle,
  FooterAlertDescription,
} from './styles';
import convertHourToMinute from '../../utils/convertHourToMinutes';

interface scheduleItensProps {
  week_day_id: string | undefined;
  from: string;
  to: string;
}
interface SubjectProps {
  id: string;
  name: string;
}

const GiveClasses: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [subject, setSubject] = useState('');
  const [subjectOptions, setSubjectOptions] = useState<SubjectProps[]>([]);
  const [daysOptions, setDaysOptions] = useState<SubjectProps[]>([]);
  const [cost, setCost] = useState('');

  const [scheduleItens, setScheduleItens] = useState<scheduleItensProps[]>([
    { week_day_id: '', from: '', to: '' },
  ]);

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

  const addNewScheduleItem = useCallback(() => {
    if (
      scheduleItens.filter(
        scheduleItem =>
          scheduleItem.week_day_id === '' ||
          scheduleItem.from === '' ||
          scheduleItem.to === '',
      )[0]
    ) {
      return Alert.alert(
        'Preencha todos os dados',
        'Preencha os dados dos horários antes de adicionar outro.',
      );
    }
    if (scheduleItens.length >= 7) {
      return Alert.alert(
        'Todos os dias já estão disponíveis',
        'Todos os horários já estão disponíveis para configuração',
      );
    }

    setScheduleItens([...scheduleItens, { week_day_id: '', from: '', to: '' }]);
  }, [scheduleItens]);

  const handleDeleteSchedule = useCallback(
    (week_day_id: string) => {
      const scheduleToDelete = scheduleItens.filter(
        scheduleItem => scheduleItem.week_day_id !== week_day_id,
      );
      setScheduleItens(scheduleToDelete);
    },
    [scheduleItens],
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

  const handleSetValueToWeekDay = useCallback(
    (index, itemValue) => {
      const dayAlreadySelected = scheduleItens.filter(
        item => item.week_day_id === itemValue,
      );

      if (dayAlreadySelected[0]) {
        return Alert.alert(
          'Dias da semana já selecionado',
          'Selecione outro dia ',
        );
      }

      return setScheduleItemValue(index, 'week_day_id', itemValue);
    },
    [scheduleItens, setScheduleItemValue],
  );

  const sendAlert = useCallback((title, content) => {
    Alert.alert(title, content);
  }, []);

  const handleSubmit = useCallback(async () => {
    const formData = {
      cost: Number(cost),
      subject_id: subject,
      schedule: scheduleItens,
    };

    try {
      scheduleItens.forEach(schedule => {
        if (
          convertHourToMinute(schedule.from) >= convertHourToMinute(schedule.to)
        ) {
          throw new TypeError('Hora de inicio depois da hora de termino.');
        }

        if (
          convertHourToMinute(schedule.from) > 1439 ||
          convertHourToMinute(schedule.from) < 0
        ) {
          throw new TypeError('Horário deve ser válido');
        }

        // Checar se é horário valido
        if (
          convertHourToMinute(schedule.to) > 1439 ||
          convertHourToMinute(schedule.to) < 0
        ) {
          throw new TypeError('Horário deve ser válido');
        }
      });

      await api.post('/classes', formData);

      Alert.alert('Perfil atualizado com sucesso!');
    } catch (err) {
      sendAlert('Erro no cadastro de aula', err.message);

      console.log(err);
    }
  }, [cost, scheduleItens, subject, sendAlert]);

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
              titleBar="Meu perfil"
              title={`Que incrível que você ${'\n'}quer dar aulas.`}
            />

            <Forms onSubmit={handleSubmit} ref={formRef}>
              <FormContent>
                <TitleForm>Sobre a aula</TitleForm>

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
                    {subjectOptions.map(item => (
                      <Picker.Item
                        label={item.name}
                        key={item.id}
                        value={item.id}
                      />
                    ))}
                  </Picker>
                </PickerView>

                <InputMask
                  type="money"
                  options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$',
                  }}
                  title="Custo da sua hora por aula"
                  icon="dollar-sign"
                  keyboardType="decimal-pad"
                  placeholder="Digite o custo por hora"
                  placeholderTextColor="#c1bccc"
                  name="cost"
                  value={cost}
                  onChangeText={text => {
                    setCost(text.substring(2).replace(',', '.'));
                  }}
                />

                <TitleGroup>
                  <TitleForm>Horários disponíveis</TitleForm>
                  <Description onPress={addNewScheduleItem}>
                    <DescriptionText>+ Novo</DescriptionText>
                  </Description>
                </TitleGroup>

                {scheduleItens.map((scheduleItem, index) => (
                  <ScheduleItem key={scheduleItem.week_day_id}>
                    <TitleSchedule>
                      <Label>Dia da semana</Label>
                      <DeleteSchedule
                        onPress={() =>
                          handleDeleteSchedule(String(scheduleItem.week_day_id))}
                      >
                        <Feather name="trash-2" size={20} color="#e33d3d" />
                      </DeleteSchedule>
                    </TitleSchedule>

                    <PickerView>
                      <Picker
                        selectedValue={scheduleItem.week_day_id}
                        onValueChange={itemValue =>
                          handleSetValueToWeekDay(index, itemValue)
                        }
                      >
                        <Picker.Item
                          label="Selecione um dia"
                          value={0}
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

                    <InputGroup>
                      <InputMask
                        containerStyle={{ width: '50%', paddingRight: 8 }}
                        type="custom"
                        options={{
                          mask: '99:99',
                        }}
                        title="De"
                        icon="clock"
                        keyboardType="number-pad"
                        placeholder="Ex. 08:00"
                        placeholderTextColor="#c1bccc"
                        name="from"
                        value={scheduleItem.from}
                        onChangeText={text =>
                          setScheduleItemValue(index, 'from', String(text))
                        }
                      />

                      <InputMask
                        containerStyle={{ width: '50%', paddingLeft: 8 }}
                        type="custom"
                        options={{
                          mask: '99:99',
                        }}
                        title="Até"
                        icon="clock"
                        keyboardType="number-pad"
                        maxLength={5}
                        placeholder="Ex. 20:00"
                        placeholderTextColor="#c1bccc"
                        name="to"
                        value={scheduleItem.to}
                        onChangeText={text =>
                          setScheduleItemValue(
                            index,
                            'to',
                            text.replace('-', ':'),
                          )
                        }
                      />
                    </InputGroup>
                  </ScheduleItem>
                ))}
              </FormContent>
              <Footer>
                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  <ButtonText>Salvar</ButtonText>
                </Button>

                <FooterAlert>
                  <Icon source={attentionIcon} resizeMode="contain" />
                  <FooterAlertTextView>
                    <FooterAlertTitle>Importante!</FooterAlertTitle>
                    <FooterAlertDescription>
                      Preencha todos os dados
                    </FooterAlertDescription>
                  </FooterAlertTextView>
                </FooterAlert>
              </Footer>
            </Forms>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default GiveClasses;
