import { UserCreateDto } from './dto/userCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {UserUpdateDto} from "./dto/userUpdate.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(userDto: UserCreateDto): Promise<User> {
    const newUser = this.userRepository.create(userDto);
    return await this.userRepository.save(newUser);
  }

  public async findUserByIdWithPassword(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id }, select: Object.keys(new User()) as (keyof User)[] });
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  public async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async updateUser(userId: string, userDto: UserUpdateDto) {
    return  await this.userRepository.update({ id: userId }, userDto);
  }
}
