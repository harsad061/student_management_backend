import { Expose, Type } from 'class-transformer';

export class UserPreviewDto {
  @Expose()
  id: string;

  @Expose()
  username: string;
}

export class StudentDto {
  @Expose()
  id: string;

  @Expose()
  student_number: string;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  gender: string;

  @Expose()
  address: string;

  @Expose()
  email: string;

  @Expose()
  grade: string;

  @Expose()
  section: string;

  @Expose()
  dob: string;

  @Expose()
  religion: string;

  @Expose()
  blood_group: string;

  @Expose()
  disease_if_any: string;

  @Expose()
  guardienName1: string;

  @Expose()
  occupation1: string;

  @Expose()
  eductaion1: string;

  @Expose()
  contact1: string;

  @Expose()
  relation1: string;

  @Expose()
  guardienName2: string;

  @Expose()
  occupation2: string;

  @Expose()
  eductaion2: string;

  @Expose()
  contact2: string;

  @Expose()
  relation2: string;

  @Expose()
  enrolled_date: string;

  @Expose()
  @Type(() => UserPreviewDto)
  user: UserPreviewDto;
}

// plainToInstance(StudentDto, studentData, { excludeExtraneousValues: true });
