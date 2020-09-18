import { getRepository, Repository } from 'typeorm';

import ISubjectsRepository from '@modules/schedule/repositories/ISubjectsRepository';

import Subject from '@modules/schedule/infra/typeorm/entities/Subject';

class SubjectsRepository implements ISubjectsRepository {
  private ormRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = getRepository(Subject);
  }

  public async findAll(): Promise<Subject[] | undefined> {
    const subjects = await this.ormRepository.find();

    return subjects;
  }
}

export default SubjectsRepository;
