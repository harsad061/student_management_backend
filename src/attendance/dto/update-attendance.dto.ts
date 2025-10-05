import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

// export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {}

export class UpdateAttendanceDto {
  @IsOptional()
  @IsDateString()
  attendanceDate: string;
}
