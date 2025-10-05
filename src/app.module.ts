import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Users } from './users/entities/user.entity';
import { StaffModule } from './staff/staff.module';
import { Role } from './roles/entities/role.entity';
import { Staff } from './staff/entities/staff.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student.entity';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/entities/attendance.entity';
import { NotificationModule } from './notification/notification.module';
import { NotificationRecipient } from './notification/entities/notification-recipient.entity';
import { Notification } from './notification/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or mysql/sqlite
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'stu_attendance',
      entities: [
        Users,
        Role,
        Staff,
        Student,
        Attendance,
        Notification,
        NotificationRecipient,
      ],
      synchronize: true, // disable in production
      // migrationsRun: true, // auto-runs migration on app start (optional)
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    StaffModule,
    StudentModule,
    AttendanceModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
