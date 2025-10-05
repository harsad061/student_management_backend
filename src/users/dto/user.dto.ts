import { Expose, Type } from 'class-transformer';

export class PrevStaffDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  // other staff fields...
}

export class PrevStudentDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  // other student fields...
}

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  role: string;

  @Expose()
  @Type(() => PrevStaffDto)
  staff?: PrevStaffDto;

  @Expose()
  @Type(() => PrevStudentDto)
  student?: PrevStudentDto;
}
