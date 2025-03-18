import { UserCreateDto } from './dto/userCreate.dto';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { PrismaService } from '../../database/prisma.service';

const selectWithPassword = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  password: true,
  picture: true,
  isVerified: true,
  googleUserId: true,
  appleUserId: true,
  createdAt: true,
  updatedAt: true,
};
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createUser(userDto: UserCreateDto): Promise<User> {
    return this.prisma.user.create({
      data: userDto,
    });
  }

  public async findUserByIdWithPassword(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      select: selectWithPassword,
    });
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async findUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async updateUser(userId: string, userDto: UserUpdateDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: userDto,
    });
  }
}
