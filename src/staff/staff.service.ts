import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { ILike, Like, Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { console } from 'inspector';
import { plainToInstance } from 'class-transformer';
import { StaffDto } from './dto/staff.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly usersService: UsersService,
  ) {}

  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  // ) {}

  async create(createStaffDto: CreateStaffDto) {
    console.log('test');
    const { user, ...staffData } = createStaffDto;

    // this.authService.register(user);
    // Check if user exists
    const existingUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (existingUser) {
      throw new NotFoundException(
        `User with username ${user.username} already exists`,
      );
    }
    const savedUser = await this.usersService.create(user);

    // Hash password
    // user.password = await bcrypt.hash(user.password, 10);

    // Create and save user
    // let savedUser: Users;
    // try {
    //   const userEntity = this.userRepository.create(user);
    //   savedUser = await this.userRepository.save(userEntity);
    // } catch (error) {
    //   throw new BadRequestException(
    //     `Failed to create user: ${error.message || 'Unknown error'}`,
    //   );
    // }

    // Add userId to staff and save
    try {
      console.log('New user ID : ', savedUser.id);
      // staffData.user = savedUser;
      console.log('staffData payload :', staffData);

      const staffEntity = this.staffRepository.create({
        ...staffData,
        user: savedUser,
      });
      const savedStaff = await this.staffRepository.save(staffEntity);
      console.log('savedStaff', savedStaff);

      return plainToInstance(StaffDto, savedStaff, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to save staff: ${error.message || 'Unknown error'}`,
      );
    }
  }

  async findAll() {
    //   const entities = await this.staffRepository
    //   .createQueryBuilder('staff')
    // .leftJoin(Users, 'user', 'user.id = CAST(staff.user_id AS uuid)')
    // .addSelect(['user.username']) // Only include username from Users
    // .getRawMany()

    const allStaff = await this.staffRepository.find({
      relations: ['user'],
    });
    return plainToInstance(StaffDto, allStaff, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const staffSingle = await this.staffRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (staffSingle) {
      return plainToInstance(StaffDto, staffSingle, {
        excludeExtraneousValues: true,
      });
    } else {
      throw new NotFoundException(`No staff record found with id ${id}`);
    }
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const student = await this.staffRepository.preload({
      id,
      ...updateStaffDto,
    });
    if (!student) throw new NotFoundException();
    return await this.staffRepository.save(student);
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }

  async searchStaff(query?: string) {
    const sta = await this.staffRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
        { address: ILike(`%${query}%`) },
        { nationalID: ILike(`%${query}%`) },
        { religion: ILike(`%${query}%`) },
        { blood_group: ILike(`%${query}%`) },
      ],
      relations: ['user'],
    });

    return plainToInstance(StaffDto, sta, {
      excludeExtraneousValues: true,
    });
  }
}
