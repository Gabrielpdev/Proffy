import { getRepository, Repository } from 'typeorm';

import ICreateClassesDTO from '@modules/classes/dtos/ICreateClassesDTO';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import Class from '../entities/Classes';

class ClassRepository implements IClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async create(classData: ICreateClassesDTO): Promise<Class> {
    const classe = this.ormRepository.create(classData);

    await this.ormRepository.save(classe);

    return classe;
  }

  public async save(classe: Class): Promise<Class> {
    return this.ormRepository.save(classe);
  }
}

export default ClassRepository;
