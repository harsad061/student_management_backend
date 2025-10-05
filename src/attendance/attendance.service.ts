import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { Student } from 'src/student/entities/student.entity';
import { Users } from 'src/users/entities/user.entity';
import { AttendanceDto } from './dto/attendance.dto';
import { plainToInstance } from 'class-transformer';
import { console } from 'inspector';
import * as XLSX from 'xlsx';

interface ExcelRow {
  UserID: string;
  Name: string;
  PunchType: string;
  Date: string; // or Date if parsed
  Time: string;
  Method?: string;
  DeviceSN?: string;
  UserType?: string;
}

type AttendanceRow = {
  attendanceId: string;
  user_type: string;
  punchType: 'Punch-In' | 'Punch-Out';
  attendanceDate: string;
  attendanceTime: string;
  method: string;
  deviceSN: string;
  user: { id: string; username: string; role: string };
};

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const user = await this.userRepository.findOneBy({
      id: createAttendanceDto.user_id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let attendance = this.attendanceRepository.create(createAttendanceDto);
    attendance.user = user;
    const savedAttendance = await this.attendanceRepository.save(attendance);
    console.log('savedAttendace', savedAttendance);

    return plainToInstance(AttendanceDto, savedAttendance, {
      excludeExtraneousValues: true,
    });

    // return savedAttendance;
  }

  findAll() {
    // return this.attendanceRepository.find();
    return plainToInstance(
      AttendanceDto,
      this.attendanceRepository.find({ relations: ['user'] }),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAllByUserId(userId: string) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    console.log('user', userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log('user', user);

    // return user;

    const attendanceByUser = await this.attendanceRepository.find({
      where: { userId: userId }, // query by the foreign key directly
      relations: ['user'], // optional
    });

    // const attendanceByUser = await this.userRepository.find({
    //   // where: { user: user }, // query by the foreign key directidly
    //   where: { id: userId },
    //   relations: ['attendance'], // optional
    // });

    if (!attendanceByUser.length) {
      throw new NotFoundException('No attendance records found for this user');
    }

    // Logger.log('attendanceById', attendanceByUser);
    // return this.mergeAttendance(attendanceByUser);

    return plainToInstance(AttendanceDto, attendanceByUser, {
      excludeExtraneousValues: true,
    });

    return attendanceByUser;
  }

  async findOne(id: string) {
    const attendanceById = await this.attendanceRepository.findOne({
      where: { attendanceId: id },
      // relations: ['staff', 'student'],
    });

    if (!attendanceById) {
      throw new NotFoundException('Attendance record not found');
    }

    return plainToInstance(AttendanceDto, attendanceById, {
      excludeExtraneousValues: true,
    });

    return attendanceById;
  }

  async findByType(userType: string) {
    console.log('Services : ', userType);
    const attendanceByType = await this.attendanceRepository.find({
      where: { user_type: userType },
      relations: ['student', 'staff'],
    });
    console.log('attendanceByType', attendanceByType);

    return plainToInstance(AttendanceDto, attendanceByType, {
      excludeExtraneousValues: true,
    });
    return attendanceByType;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    // const updated = await this.attendanceRepository.preload({
    //   attendanceId: id,
    //   attendanceDate: new Date(updateAttendanceDto.attendanceDate), // always ensure it's a Date object
    // });

    console.log('attendanceDate123456', updateAttendanceDto);
    const attendance = await this.attendanceRepository.preload({
      attendanceId: id, // primary key is required
      ...updateAttendanceDto,
    });

    if (!attendance) throw new NotFoundException();

    return this.attendanceRepository.save(attendance);

    // if (!attendanceData) {
    //   throw new BadRequestException(
    //     `Attendance record not found for id : ${id}`,
    //   );
    // }
    return attendance;

    return `This action updates a #${updateAttendanceDto.attendanceDate} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }

  async uploadExcel(filePath: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: ExcelRow[] = XLSX.utils.sheet_to_json<ExcelRow>(sheet, {
      defval: '',
    });

    for (const row of data) {
      const userId = row['UserID'];
      const punchType = row['PunchType'];
      const dateSerial = Number(row['Date']); // ensure it's a number
      const timeSerial = Number(row['Time']); // ensure it's a number
      const attendanceDate = this.excelDateToJSDate(dateSerial);
      const attendanceTime = this.excelTimeToJSDate(timeSerial);

      const exists = await this.attendanceRepository.findOne({
        where: { userId, attendanceDate: attendanceDate, punchType },
      });

      const rowToEntity = {
        userId: row['UserID'].trim(),
        attendanceDate: attendanceDate,
        attendanceTime: attendanceTime,
        punchType: row['PunchType'].trim(),
        method: row['Method'],
        deviceSN: row['DeviceSN'],
        user_type: row['UserType'] || 'staff',
      };

      if (!exists) {
        const record = this.attendanceRepository.create(rowToEntity);
        await this.attendanceRepository.save(record);
      }
    }

    return 'Upload complete. New records inserted.';
  }

  private excelDateToJSDate(dateSerial: number): string {
    const excelStart = new Date(1899, 11, 30); // Dec 30, 1899
    const dateInMs = dateSerial * 24 * 60 * 60 * 1000;
    const fullDate = new Date(excelStart.getTime() + dateInMs);
    fullDate.setHours(0, 0, 0, 0); // strip time
    return fullDate.toISOString().split('T')[0];
  }

  private excelTimeToJSDate(timeSerial: number): string {
    const totalSeconds = Math.round(timeSerial * 24 * 60 * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // return as "HH:MM:SS" string
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  private mergeAttendance(rows: any) {
    const mergedMap: Record<string, any> = {};

    for (const row of rows) {
      const key = `${row.user.id}-${row.attendanceDate}`;

      if (!mergedMap[key]) {
        mergedMap[key] = {
          user: row.user,
          attendanceDate: row.attendanceDate,
          punchIn: '',
          punchOut: '',
          punchInMethod: '',
          punchOutMethod: '',
          punchInDevice: '',
          punchOutDevice: '',
        };
      }

      if (row.punchType === 'Punch-In') {
        mergedMap[key].punchIn = row.attendanceTime;
        mergedMap[key].punchInMethod = row.method;
        mergedMap[key].punchInDevice = row.deviceSN;
      } else if (row.punchType === 'Punch-Out') {
        mergedMap[key].punchOut = row.attendanceTime;
        mergedMap[key].punchOutMethod = row.method;
        mergedMap[key].punchOutDevice = row.deviceSN;
      }
    }

    return Object.values(mergedMap);
  }
}
