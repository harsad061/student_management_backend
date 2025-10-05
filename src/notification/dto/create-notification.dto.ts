import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  sendTo: string;

  @IsUUID()
  postedBy: string; // teacher/admin id
}
