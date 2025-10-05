import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';
import { NotificationRecipient } from './entities/notification-recipient.entity';
import { Users } from 'src/users/entities/user.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationRecipient, Users]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationModule {}
