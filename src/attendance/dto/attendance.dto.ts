import { Expose, Transform, Type } from 'class-transformer';

export class UserPreviewDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  role: string;
}

export class AttendanceDto {
  @Expose()
  attendanceId: string;

  @Expose()
  user_type: string;

  @Expose()
  punchType: string;

  @Expose()
  attendanceDate: String;

  @Expose()
  attendanceTime: String;

  @Expose()
  method: string;

  @Expose()
  deviceSN: string;

  // @Expose()
  // @Type(() => UserPreviewDto)
  // user: UserPreviewDto;

  @Expose()
  status: string;

  @Expose()
  remark: String;

  // Flatten user properties
  // Flatten user.id → userId
  @Expose()
  @Transform(({ obj }) => obj.user?.id)
  userId: string;

  // Flatten user.username → username
  @Expose()
  @Transform(({ obj }) => obj.user?.username)
  username: string;

  // Flatten user.role → role
  @Expose()
  @Transform(({ obj }) => obj.user?.role)
  role: string;
}
