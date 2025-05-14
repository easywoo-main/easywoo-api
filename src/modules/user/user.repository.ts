import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '.prisma/client';
import { PageRequest } from '../../utils/page-request.utils';

const selectWithPassword: Record<keyof UserEntity, true> = Object.fromEntries(Object.keys(new UserEntity()).map((key) => [key, true])) as Record<keyof UserEntity, true>;

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createUser(userDto: UserCreateDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: userDto
    });
  }

  public async findUserByIdWithPassword(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { id },
      select: selectWithPassword
    });
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  public async findUserById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  public async updateUser(userId: string, userDto: Partial<UserEntity>): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id: userId },
      data: userDto
    });
  }

  public async getAllUserByChatId(chatId: string, pageRequest: PageRequest) {
    return this.prisma.user.findMany({
      where: {
        chats: { some: { id: chatId } },
        ...this.getWhereProp(pageRequest)
      },
      ...pageRequest.getFilter()
    });
  }

  public async getCountUser(chatId: string, pageRequest: PageRequest) {
    return this.prisma.user.count({
      where: {
        chats: { some: { id: chatId } },
        ...this.getWhereProp(pageRequest)
      }
    });
  }

  private getWhereProp(pageRequest: PageRequest): Prisma.UserWhereInput {
    return {
      ...(pageRequest.search && {
        name: {
          contains: pageRequest.search,
          mode: 'insensitive'
        },
        email: {
          contains: pageRequest.search,
          mode: 'insensitive'
        },
        id: {
          contains: pageRequest.search,
          mode: 'insensitive'
        }
      })
    };
  }
}
