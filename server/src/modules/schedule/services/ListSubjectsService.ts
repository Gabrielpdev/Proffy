import { inject, injectable } from 'tsyringe';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import ISubjectsRepository from '../repositories/ISubjectsRepository';
import Subject from '../infra/typeorm/entities/Subject';

@injectable()
class ListSubjectsService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(): Promise<Subject[] | undefined> {
    const keyCache = `subjects`;

    let subject = await this.cacheProvider.recover<Subject[]>(keyCache);

    if (!subject) {
      subject = await this.subjectsRepository.findAll();

      this.cacheProvider.save(keyCache, subject);
    }

    return subject;
  }
}

export default ListSubjectsService;
