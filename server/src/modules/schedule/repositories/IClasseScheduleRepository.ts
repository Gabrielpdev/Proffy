import ClassSchedule from '@modules/schedule/infra/typeorm/entities/ClassesSchedule';

import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';

export default interface IClasseScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<ClassSchedule>;
}
