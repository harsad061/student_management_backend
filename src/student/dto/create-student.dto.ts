import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateStudentDto {
  @IsDefined()
  @IsString()
  student_number?: string;

  @IsDefined()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEmail()
  email?: string;

  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  religion?: string;

  @IsOptional()
  @IsString()
  blood_group?: string;

  @IsOptional()
  @IsString()
  disease_if_any?: string;

  @IsOptional()
  @IsString()
  guardienName1?: string;

  @IsOptional()
  @IsString()
  occupation1?: string;

  @IsOptional()
  @IsString()
  eductaion1?: string;

  @IsOptional()
  @IsString()
  contact1?: string;

  @IsOptional()
  @IsString()
  relation1?: string;

  @IsOptional()
  @IsString()
  guardienName2?: string;

  @IsOptional()
  @IsString()
  occupation2?: string;

  @IsOptional()
  @IsString()
  eductaion2?: string;

  @IsOptional()
  @IsString()
  contact2?: string;

  @IsOptional()
  @IsString()
  relation2?: string;

  @IsOptional()
  @IsString()
  enrolled_date?: string;

  @IsOptional()
  user: CreateUserDto;
}
