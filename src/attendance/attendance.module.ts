import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Student } from 'src/student/entities/student.entity';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Staff, Student, Users])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
