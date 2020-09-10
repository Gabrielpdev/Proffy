import User from '@modules/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProffysDTO from '@modules/users/dtos/IFindAllProffysDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findAllProffys(data: IFindAllProffysDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
