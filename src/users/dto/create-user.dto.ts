// import { IsString, IsOptional, MinLength, IsBoolean } from 'class-validator';

// export class CreateUserDto {
//   @IsString()
//   username: string;

//   @IsString()
//   @MinLength(6)
//   password: string;

//   @IsOptional()
//   role?: string;

//   @IsOptional()
//   @IsBoolean()
//   isActive: boolean;
// }

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsUUID,
  ArrayNotEmpty,
  IsDefined,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsUUID()
  @IsOptional()
  roleId?: string; // Pass the Role ID, not the whole Role object

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  @IsOptional()
  permissionIds?: string[]; // Array of Permission IDs

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
