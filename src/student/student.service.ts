import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Like, QueryFailedError, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { StudentDto } from './dto/student.dto';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { equal } from 'assert';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly usersService: UsersService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    console.log('test');
    const { user, ...studetData } = createStudentDto;

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

    try {
      console.log('New user ID : ', savedUser.id);
      // staffData.user = savedUser;
      console.log('staffData payload :', studetData);

      const studentEntity = this.studentRepository.create({
        ...studetData,
        user: savedUser,
      });
      const savedStudent = await this.studentRepository.save(studentEntity);
      console.log('savedStaff', savedStudent);

      return plainToInstance(StudentDto, savedStudent, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to save staff: ${error.message || 'Unknown error'}`,
      );
    }
  }

  findAll() {
    const studetData = this.studentRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'ASC',
      },
    });
    return plainToInstance(StudentDto, studetData, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    try {
      const student = await this.studentRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }

      return plainToInstance(StudentDto, student, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException(`Invalid UUID format for ID: ${id}`);
      }
      throw err;
    }

    return `This action returns a #${id} student`;
  }

  async findOneByUserId(userId: string) {
    try {
      const studentBYuserID = await this.studentRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user'],
      });

      if (!studentBYuserID) {
        throw new NotFoundException(
          `Student with link witt User ID ${userId} not found`,
        );
      }

      return plainToInstance(StudentDto, studentBYuserID, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException(`Invalid UUID format for ID: ${userId}`);
      }
      throw err;
    }

    // return `This action returns a #${id} student`;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.preload({
      id,
      ...updateStudentDto,
    });
    if (!student) throw new NotFoundException();
    return await this.studentRepository.save(student);

    // return `This action updates a #${id} student`;
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      // Handle not found case, maybe throw error or return early
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    await this.studentRepository.remove(student);
    // return `This action removes a #${id} student`;
  }

  async searchStudent(params: {
    name?: string;
    grade?: string;
    section?: string;
  }) {
    const std = await this.studentRepository.find({
      where: {
        ...(params.name ? { name: Like(`%${params.name}%`) } : {}),
        ...(params.grade ? { grade: params.grade } : {}),
        ...(params.section ? { section: params.section } : {}),
      },
      relations: ['user'],
    });

    return plainToInstance(StudentDto, std, {
      excludeExtraneousValues: true,
    });
  }
}
