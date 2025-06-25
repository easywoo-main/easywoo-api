import { Injectable } from '@nestjs/common';
import { AppleUserEntity } from './appleUser.entity';
import { Prisma } from '.prisma/client';
import { Repository } from '../../../database/repository.service';
import { CreateAppleUserDto } from './dtos/createAppleUser.dto';

@Injectable()
export class AppleUserRepository {
  private readonly  appleRepository: Prisma.AppleUserDelegate;
  constructor(repository: Repository) {
    this.appleRepository = repository.appleUser
  }

  public async findAppleUserByEmail(email: string): Promise<AppleUserEntity> {
    return this.appleRepository.findUnique({where: {email}});
  }

  public async createAppleUser(data: CreateAppleUserDto): Promise<AppleUserEntity> {
    return this.appleRepository.create({data});
  }

  public async updateAppleUser(id: string, data: CreateAppleUserDto): Promise<AppleUserEntity> {
    return this.appleRepository.update({where: {id}, data});
  }
}
