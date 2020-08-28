import ICreateScheduleDTO from './ICreateScheduleDTO';

export default interface ICreateClassesDTO {
  subject: string;
  cost: number;
  schedule: [ICreateScheduleDTO];
}
