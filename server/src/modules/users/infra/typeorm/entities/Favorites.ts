import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Classes from '@modules/classes/infra/typeorm/entities/Classes';
import Users from './Users';

@Entity('favorites')
class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_id: string;

  @ManyToOne(() => Users, users => users.id)
  @JoinColumn({ name: 'student_id' })
  student: Users;

  @Column()
  class_id: string;

  @ManyToOne(() => Classes, classes => classes.id)
  @JoinColumn({ name: 'class_id' })
  classe: Classes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Favorites;
