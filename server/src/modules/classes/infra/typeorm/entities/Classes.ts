import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users';
import Subject from '@modules/schedule/infra/typeorm/entities/Subject';

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject_id: string;

  @ManyToOne(() => Subject, subjects => subjects.id)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column()
  cost: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User, users => users.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Class;
