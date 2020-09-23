import { getRepository, Repository } from 'typeorm';

import IFavoriteRepository from '@modules/users/repositories/IFavoriteRepository';
import ICreateFavoriteDTO from '@modules/users/dtos/ICreateFavoriteDTO';

import Favorites from '@modules/users/infra/typeorm/entities/Favorites';

class FavoriteRepository implements IFavoriteRepository {
  private ormRepository: Repository<Favorites>;

  constructor() {
    this.ormRepository = getRepository(Favorites);
  }

  public async getFavorites(student_id: string): Promise<Favorites[]> {
    const favorites = await this.ormRepository.find({ where: { student_id } });

    return favorites;
  }

  public async create(data: ICreateFavoriteDTO): Promise<Favorites> {
    const favorite = this.ormRepository.create(data);

    await this.ormRepository.save(favorite);

    return favorite;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FavoriteRepository;
