import { Staff } from 'src/staff/entities/staff.entity';
import { Student } from 'src/student/entities/student.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
}

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  attendanceId: string;

  //   @Column({ nullable: true })
  //   student_id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  punchType: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  deviceSN: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  user_type: string;

  @Column({ nullable: true })
  classId: number;

  @Column()
  attendanceDate: String;

  @Column()
  attendanceTime: String;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    nullable: true,
  })
  status: AttendanceStatus;

  @Column({ nullable: true })
  remarks: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // // Relations

  //   @ManyToOne(() => Student, (student) => student.attendances)
  //   @JoinColumn({ name: 'studentId' })
  //   student: Student;

  //   @ManyToOne(() => Staff, (staff) => staff.attendances)
  //   @JoinColumn({ name: 'staffId' })
  //   class: Staff;
}
