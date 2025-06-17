import { Repository } from '../../../database/repository.service';
import { GoogleUser } from '@prisma/client';
import { GoogleCreateDto } from './dtos/googleCreate.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';

@Injectable()
export class GoogleRepository {
  private readonly  googleRepository: Prisma.GoogleUserDelegate;
  constructor(repository: Repository) {
    this.googleRepository = repository.googleUser
  }

  public async findOneByEmail(email: string) {
    return this.googleRepository.findUnique({
      where: {
        email,
      },
      include: {
        user: true,
      },
    });
  }

  public async updateGoogleUser(id: string, googleDto: Partial<GoogleUser>) {
    return this.googleRepository.update({
      where: {
        id,
      },
      data: googleDto,
    });
  }

  public async createGoogleUser(googleDto: GoogleCreateDto) {
    return this.googleRepository.create({
      data: googleDto,
    });
  }
}
