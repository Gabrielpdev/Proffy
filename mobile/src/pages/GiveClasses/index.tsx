import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Feather } from '@expo/vector-icons';

import Input from '../../components/Input';
import InputMask from '../../components/Input';

import attentionIcon from '../../assets/images/atention.png';

import PageHeader from '../../components/PageHeader';

import {
  Container,
  Form,
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

interface scheduleItensProps {
  week_day: number | undefined;
  from: string;
  to: string;
}

const GiveClasses: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItens, setScheduleItens] = useState<scheduleItensProps[]>([
    { week_day: 0, from: '', to: '' },
  ]);

  const addNewScheduleItem = useCallback(() => {
    if (
      scheduleItens.filter(
        scheduleItem =>
          scheduleItem.week_day === 0 ||
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

    setScheduleItens([...scheduleItens, { week_day: 0, from: '', to: '' }]);
  }, [scheduleItens]);

  const handleDeleteSchedule = useCallback(
    (week_day: string) => {
      const scheduleToDelete = scheduleItens.filter(
        scheduleItem => scheduleItem.week_day !== Number(week_day),
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
        item => item.week_day === itemValue,
      );

      if (dayAlreadySelected[0]) {
        return Alert.alert(
          'Dias da semana já selecionado',
          'Selecione outro dia ',
        );
      }

      return setScheduleItemValue(index, 'week_day', itemValue);
    },
    [scheduleItens, setScheduleItemValue],
  );

  const handleSubmit = useCallback(() => {
    console.log(scheduleItens);
    console.log(cost);
  }, [cost, scheduleItens]);

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

            <Form>
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
                    <Picker.Item label="Português" value="Português" />
                    <Picker.Item label="Matemática" value="Matemática" />
                    <Picker.Item label="Geografia" value="Geografia" />
                    <Picker.Item label="Historia" value="Historia" />
                    <Picker.Item label="Biologia" value="Biologia" />
                    <Picker.Item label="Química" value="Química" />
                    <Picker.Item label="Artes" value="Artes" />
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
                  <ScheduleItem key={scheduleItem.week_day}>
                    <TitleSchedule>
                      <Label>Dia da semana</Label>
                      <DeleteSchedule
                        onPress={() =>
                          handleDeleteSchedule(String(scheduleItem.week_day))
                        }
                      >
                        <Feather name="trash-2" size={20} color="#e33d3d" />
                      </DeleteSchedule>
                    </TitleSchedule>

                    <PickerView>
                      <Picker
                        selectedValue={scheduleItem.week_day}
                        onValueChange={itemValue =>
                          handleSetValueToWeekDay(index, itemValue)}
                      >
                        <Picker.Item
                          label="Selecione um dia"
                          value={0}
                          color="#c1bccc"
                        />
                        <Picker.Item label="Domingo" value={1} />
                        <Picker.Item label="Segunda" value={2} />
                        <Picker.Item label="Terça" value={3} />
                        <Picker.Item label="Quarta" value={4} />
                        <Picker.Item label="Quinta" value={5} />
                        <Picker.Item label="Sexta" value={6} />
                        <Picker.Item label="Sábado" value={7} />
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
                        value={scheduleItem.from}
                        onChangeText={text =>
                          setScheduleItemValue(index, 'from', String(text))}
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
                        value={scheduleItem.to}
                        onChangeText={text =>
                          setScheduleItemValue(
                            index,
                            'to',
                            text.replace('-', ':'),
                          )}
                      />
                    </InputGroup>
                  </ScheduleItem>
                ))}
              </FormContent>
              <Footer>
                <Button onPress={handleSubmit}>
                  <ButtonText>Salvar cadastro</ButtonText>
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
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default GiveClasses;
