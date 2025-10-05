import { Controller, Post, Body, Get, Param, Put, Query } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notification.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Create notification (goes to all students)
  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  // Get all notifications
  @Get()
  getAllNotifications(@Query('query') query?: string) {
    if (query && query.trim()) {
      return this.notificationsService.searchNotification(query);
    }
    return this.notificationsService.getAll();
  }

  // Get all notifications for a student
  @Get('user/:id')
  getUserNotifications(@Param('id') userId: string) {
    return this.notificationsService.getForUser(userId);
  }

  // Get all notifications
  @Get(':id')
  getNotificationsById(@Param('id') id: string) {
    return this.notificationsService.getNotificationsById(id);
  }

  // Get all notifications
  @Put(':id')
  updateNotificationsById(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.updateNotificationsById(
      id,
      updateStudentDto,
    );
  }

  // Get unread notifications for a student
  @Get('user/:id/unread')
  getUnreadNotifications(@Param('id') userId: string) {
    return this.notificationsService.getUnreadForUser(userId);
  }

  // Get unread count (badge)
  @Get('user/:id/unread/count')
  getUnreadCount(@Param('id') userId: string) {
    return this.notificationsService.getUnreadCount(userId);
  }

  // Mark single notification as read
  @Post(':id/read/:studentId')
  markRead(
    @Param('id') notificationId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.notificationsService.markAsRead(notificationId, studentId);
  }

  // Mark all notifications as read
  @Post('user/:id/mark-all-read')
  markAllRead(@Param('id') studentId: string) {
    return this.notificationsService.markAllAsRead(studentId);
  }
}
