import { UserCreateDto } from './dto/userCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(userDto: UserCreateDto): Promise<User> {
    return await this.userRepository.save(userDto);
  }

  public async findUserByIdWithPassword(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  public async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
