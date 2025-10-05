// src/roles/dto/assign-permissions.dto.ts
import { IsArray, IsUUID } from 'class-validator';

export class AssignPermissionsDto {
  @IsArray()
  @IsUUID('all', { each: true }) // since these are IDs
  permissionIds: string[];
}
