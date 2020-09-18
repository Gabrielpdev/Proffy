import Subject from '@modules/schedule/infra/typeorm/entities/Subject';

export default interface ISubjectsRepository {
  findAll(): Promise<Subject[] | undefined>;
}
