import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { Prisma } from '.prisma/client';

const selectWithPassword: Record<keyof UserEntity, true> = Object.fromEntries(Object.keys(new UserEntity()).map((key) => [key, true])) as Record<keyof UserEntity, true>;

@Injectable()
export class UserRepository {
  private readonly userRepository: Prisma.UserDelegate;
  constructor(repository: Repository) {
    this.userRepository = repository.user
  }

  public async createUser(userDto: UserCreateDto): Promise<UserEntity> {
    return this.userRepository.create({
      data: userDto
    });
  }

  public async findUserByIdWithPassword(id: string): Promise<UserEntity> {
    return this.userRepository.findUnique({
      where: { id },
      select: selectWithPassword
    });
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findUnique({
      where: { email }
    });
  }

  public async findUserById(id: string): Promise<UserEntity> {
    return this.userRepository.findUnique({
      where: { id }
    });
  }

  public async updateUser(userId: string, userDto: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.update({
      where: { id: userId },
      data: userDto
    });
  }
}
