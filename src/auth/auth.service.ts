import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Users } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Not, IsNull } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user based on username and password.
   */
  async validateUser(username: string, password: string) {
    console.log('username', username);
    const user = await this.userRepository.findOne({
      where: { username: username, role: Not(IsNull()) },
      relations: ['staff', 'student'],
    });

    // console.log("passsword",user?.password)
    // if (typeof user?.password === 'string') {
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   console.log("compare:", isMatch);
    // } else {
    //   console.error("User or password hash is missing");
    // }

    // console.log("user",await this.userRepository.find())

    if (user && (await bcrypt.compare(password, user.password))) {
      // return plainToInstance(UserDto, user, {
      //   excludeExtraneousValues: true,
      // });

      const u: UserDto = plainToInstance(UserDto, user, {
        excludeExtraneousValues: true,
      });
      // const userData = plainToInstance(user.t, user, { excludeExtraneousValues: true });
      return u;
    }
    return null;
  }

  /**
   * Handles login and returns a signed JWT token.
   */
  login(user: UserDto) {
    const { id, username, role, staff, student } = user;
    const payload = {
      sub: id,
      username: username,
      role: role,
      profile: staff || student,
    };

    return {
      access_token: this.jwtService.sign(payload),
      profile: user,
    };
  }

  /**
   * Optional: Registration handler (for completeness)
   */
  async register(user: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (existing) throw new Error('User already exists');

    user.password = await bcrypt.hash(user.password, 10);

    // Now create the entity directly with the updated DTO
    const newUser = this.userRepository.create(user);

    // const newUser = this.userRepository.create({
    //   username:username,
    //   password: hashedPassword,
    //   role:role?.id,
    // });

    return this.userRepository.save(newUser);
  }
}
