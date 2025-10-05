// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // 👈 register repositories
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // if other modules also need RolesService
})
export class RolesModule {}
