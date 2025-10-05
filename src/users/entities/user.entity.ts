import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  role: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Inverse side (optional)
  @OneToOne(() => Staff, (staff) => staff.user)
  staff: Staff;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendance: Attendance;
}
