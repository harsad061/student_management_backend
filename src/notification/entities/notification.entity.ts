import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { NotificationRecipient } from './notification-recipient.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notification_id: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  sendTo: string;

  @Column()
  postedBy: string; // FK to users (teacher/admin)

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => NotificationRecipient, (recipient) => recipient.notification)
  recipients: NotificationRecipient[];
}
