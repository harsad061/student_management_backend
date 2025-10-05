import {
  IsOptional,
  IsString,
  IsEmail,
  IsUUID,
  IsDefined,
  IsNotEmpty,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateStaffDto {
  // @IsString()
  @IsDefined({ message: 'Name is required' }) // required field
  @IsString({ message: 'Name must be a string' }) // must be string
  @IsNotEmpty({ message: 'Name cannot be empty | null' }) // no ""
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  enrolled_date?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  nationalID?: string;

  @IsOptional()
  @IsString()
  religion?: string;

  @IsOptional()
  @IsString()
  blood_group?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  user: CreateUserDto;
}
