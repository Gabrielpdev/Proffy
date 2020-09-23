import Favorites from '@modules/users/infra/typeorm/entities/Favorites';
import ICreateFavoriteDTO from '@modules/users/dtos/ICreateFavoriteDTO';

export default interface IConnectionRepository {
  create(data: ICreateFavoriteDTO): Promise<Favorites>;
  delete(id: string): Promise<void>;
  getFavorites(user_id: string): Promise<Favorites[]>;
}
