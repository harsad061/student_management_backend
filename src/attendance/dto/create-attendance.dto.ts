import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
}

export class CreateAttendanceDto {
  @IsDefined()
  @IsUUID()
  user_id: string;

  @IsDefined()
  @IsString()
  punchType: string;

  //   @IsOptional()
  //   @IsUUID()
  //   staff_id: string;

  @IsString()
  user_type: string;

  @IsDefined()
  @IsDateString()
  attendanceDate: String;

  @IsDefined()
  @IsString()
  attendanceTime: String;

  @IsOptional()
  @IsString()
  method: string;

  @IsOptional()
  @IsString()
  deviceSN: string;

  @IsOptional()
  @IsUUID()
  @IsInt()
  classId: number;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
