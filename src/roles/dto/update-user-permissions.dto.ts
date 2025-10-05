import { IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserPermissionsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  permissionIds: number[];
}
