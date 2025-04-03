import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserRepository } from './user.repository';
import { Success } from '../../utils/success.utils';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { CheckExistsDecorator } from '../../decorators';
import { StorageService } from '../storage/storage.service';
import { userAvatarPath } from '../../utils/storage.constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
              private readonly storageService: StorageService) {
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

  @CheckExistsDecorator('User not found')
  public async findUserByIdWithPassword(userId: string): Promise<UserEntity> {
    return this.userRepository.findUserByIdWithPassword(userId);
  }

  @CheckExistsDecorator('User not found')
  public async findUserById(userId: string): Promise<UserEntity> {
    return this.userRepository.findUserById(userId);
  }

  async updateUser(userId: string, updateUser: Partial<UserEntity>, file?: Express.Multer.File) {
    await this.findUserById(userId);
    if (file) {
      await this.storageService.uploadFile(file, userAvatarPath(userId), userId);
    }
    return await this.userRepository.updateUser(userId, updateUser);
  }
}
