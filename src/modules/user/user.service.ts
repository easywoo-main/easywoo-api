import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserRepository } from './user.repository';
import { Success } from '../../utils/success.utils';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { CheckExists } from '../../decorators';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  public async createUser(userDto: UserCreateDto): Promise<UserEntity> {
    const existingUser = await this.findUserByEmail(userDto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.userRepository.createUser(userDto);
    return this.findUserById(newUser.id);
  }

  public async verifyUserPassword(userId: string, password: string, error: HttpException = new BadRequestException('Invalid password')): Promise<Success> {
    const user = await this.findUserByIdWithPassword(userId);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw error;
    }

    return new Success('Password verified');
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findUserByEmail(email);
  }

  @CheckExists('User not found')
  public async findUserByIdWithPassword(userId: string): Promise<UserEntity> {
    return this.userRepository.findUserByIdWithPassword(userId);
  }

  @CheckExists('User not found')
  public async findUserById(userId: string): Promise<UserEntity> {
    return this.userRepository.findUserById(userId);
  }

  async updateUser(userId: string, updateUser: Partial<UserEntity>) {
    await this.findUserById(userId);
    return await this.userRepository.updateUser(userId, updateUser);
  }
}
