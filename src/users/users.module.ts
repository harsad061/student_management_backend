import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Staff } from '../staff/entities/staff.entity';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Staff, Student]), // <-- register repository here
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
