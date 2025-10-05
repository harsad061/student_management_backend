import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationRecipient } from './entities/notification-recipient.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Users } from 'src/users/entities/user.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,

    @InjectRepository(NotificationRecipient)
    private readonly recipientRepo: Repository<NotificationRecipient>,

    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  // Create notification and assign to all students
  async create(dto: CreateNotificationDto) {
    const { title, message, sendTo, postedBy } = dto;

    const notification = this.notificationRepo.create(dto);
    await this.notificationRepo.save(notification);

    // Fetch all students
    const students = await this.userRepo.find({ where: { role: 'student' } });

    // Create recipients
    const recipients = students.map((student) =>
      this.recipientRepo.create({
        notificationId: notification.notification_id,
        studentId: student.id,
      }),
    );
    await this.recipientRepo.save(recipients);

    return {
      notification,
      recipientsCount: recipients.length,
    };
  }

  // Get all notifications for a student
  async getAll() {
    return this.notificationRepo.find({
      order: { created_at: 'DESC' },
    });
  }

  async searchNotification(query: string) {
    const noticeSearch = await this.notificationRepo.find({
      where: [
        { title: ILike(`%${query}%`) },
        { message: ILike(`%${query}%`) },
        { sendTo: ILike(`%${query}%`) },
      ],
    });

    return noticeSearch;
  }

  // Get all notifications for a student
  async getNotificationsById(id: string) {
    return this.notificationRepo.findOneBy({ notification_id: id });
  }

  // update  notice
  async updateNotificationsById(id: string, payload: UpdateNotificationDto) {
    const notic = await this.notificationRepo.preload({
      notification_id: id, // use the id parameter here
      ...payload,
    });
    if (!notic) throw new NotFoundException();
    return await this.notificationRepo.save(notic);
  }

  // Get all notifications for a student
  async getForUser(userId: string) {
    return this.recipientRepo.find({
      where: { studentId: userId },
      relations: ['notification'],
      order: { id: 'DESC' },
    });
  }

  // Get unread notifications for a student
  async getUnreadForUser(userId: string) {
    return this.recipientRepo.find({
      where: { studentId: userId, isRead: false },
      relations: ['notification'],
      order: { id: 'DESC' },
    });
  }

  // Get unread count (badge)
  async getUnreadCount(userId: string) {
    return this.recipientRepo.count({
      where: { studentId: userId, isRead: false },
    });
  }

  // Mark one notification as read
  async markAsRead(notificationId: string, studentId: string) {
    return this.recipientRepo.update(
      { notificationId, studentId },
      { isRead: true, readAt: new Date() },
    );
  }

  // Mark all as read
  async markAllAsRead(studentId: string) {
    return this.recipientRepo.update(
      { studentId, isRead: false },
      { isRead: true, readAt: new Date() },
    );
  }
}
