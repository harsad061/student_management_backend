import { IsInt, IsUUID } from 'class-validator';

export class MarkReadDto {
  @IsUUID()
  notificationId: number;

  @IsUUID()
  recipientId: number;
}
