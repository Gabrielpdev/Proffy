import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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
  teacher_id: string;

  @ManyToOne(() => Users, users => users.id)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Users;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Favorites;
