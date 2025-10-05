import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  student_number: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  section: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  religion: string;

  @Column({ nullable: true })
  blood_group: string;

  @Column({ nullable: true })
  disease_if_any: string;

  @Column({ nullable: true })
  guardienName1: string;

  @Column({ nullable: true })
  occupation1: string;

  @Column({ nullable: true })
  eductaion1: string;

  @Column({ nullable: true })
  contact1: string;

  @Column({ nullable: true })
  relation1: string;

  @Column({ nullable: true })
  guardienName2: string;

  @Column({ nullable: true })
  occupation2: string;

  @Column({ nullable: true })
  eductaion2: string;

  @Column({ nullable: true })
  contact2: string;

  @Column({ nullable: true })
  relation2: string;

  @Column({ nullable: true })
  enrolled_date: string;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];
}
