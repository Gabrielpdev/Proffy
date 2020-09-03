import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import WeekDay from '@modules/schedule/infra/typeorm/entities/WeekDay';
import Class from '@modules/classes/infra/typeorm/entities/Classes';

@Entity('classes_schedule')
class ClassSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  week_day_id: string;

  @ManyToOne(() => WeekDay)
  @JoinColumn({ name: 'week_day_id' })
  week_day: WeekDay;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  class_id: string;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassSchedule;
