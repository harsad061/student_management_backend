import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { promises } from 'dns';
import { Staff } from 'src/staff/entities/staff.entity';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existing) throw new Error('User already exists');

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    // Now create the entity directly with the updated DTO
    const newUser = this.userRepository.create(createUserDto);
    const saveUser = this.userRepository.save(newUser);

    console.log('newuser', saveUser);

    // return plainToInstance(UserDto, saveUser, {
    //   excludeExtraneousValues: true,
    // });

    return saveUser;
  }

  findAll() {
    return this.userRepository.find({
      relations: ['staff', 'student'],
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['staff', 'student'],
    });
  }

  async verifyUserExist(username: string) {
    const user = await this.userRepository.findOneBy({ username: username });
    return !!user;
  }

  searchUser(username?: string, page: number = 1, limit: number = 10) {
    const query = this.userRepository.createQueryBuilder('user');
    if (username) {
      query.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }
    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
