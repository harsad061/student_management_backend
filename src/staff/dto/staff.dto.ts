import { Expose, Transform, Type } from 'class-transformer';

export class UserPreviewDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  role: string;
}

export class StaffDto {
  @Expose()
  id: string;

  @Expose()
  name?: string;

  @Expose()
  phone?: string;

  @Expose()
  email?: string;

  @Expose()
  dob?: string;

  @Expose()
  enrolled_date?: string;

  @Expose()
  gender?: string;

  @Expose()
  address?: string;

  @Expose()
  experience?: string;

  @Expose()
  nationalID?: string;

  @Expose()
  religion?: string;

  @Expose()
  blood_group?: string;

  @Expose()
  education?: string;

  @Expose()
  @Type(() => UserPreviewDto)
  user: UserPreviewDto;
}
