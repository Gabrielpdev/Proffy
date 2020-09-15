import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users';
import Subject from '@modules/schedule/infra/typeorm/entities/Subject';
import ClassesSchedule from '@modules/schedule/infra/typeorm/entities/ClassesSchedule';

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

  @OneToMany(() => ClassesSchedule, classes_schedule => classes_schedule.class)
  class_schedule: ClassesSchedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Class;
