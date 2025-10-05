// staff.entity.js
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' }) // 👈 FK column will be created in Staff table
  user: Users;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  enrolled_date: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  experience: string;

  @Column({ nullable: true })
  nationalID: string;

  @Column({ nullable: true })
  religion: string;

  @Column({ nullable: true })
  blood_group: string;

  @Column({ nullable: true })
  education: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];
}
