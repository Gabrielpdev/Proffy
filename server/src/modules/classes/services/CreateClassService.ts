import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IClassesRepository from '../repositories/IClassesRepository';
import Class from '../infra/typeorm/entities/Classes';

interface IRequest {
  subject: string;
  cost: number;
  schedule: [
    {
      week_day: number;
      from: string;
      to: string;
    },
  ];
}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({ subject, cost, schedule }: IRequest): Promise<Class> {
    const appointment = await this.classesRepository.create({
      subject,
      cost,
      schedule,
    });

    return appointment;
  }
}

export default CreateClassService;
