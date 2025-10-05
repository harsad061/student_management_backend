import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  roleId?: number; // optional default role assignment
}
