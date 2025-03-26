import { PrismaService } from '../../../database/prisma.service';
import { GoogleUser } from '@prisma/client';
import { GoogleCreateDto } from './dtos/googleCreate.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findOneByEmail(email: string) {
    console.log('email', email);
    console.log('this.prisma', this.prisma);
    const s = this.prisma.googleUser.findUnique({
      where: {
        email,
      },
      include: {
        user: true,
      },
    });
    console.log('s', s);
    return s;
  }

  public async updateGoogleUser(id: string, googleDto: Partial<GoogleUser>) {
    return this.prisma.googleUser.update({
      where: {
        id,
      },
      data: googleDto,
    });
  }

  public async createGoogleUser(googleDto: GoogleCreateDto) {
    return this.prisma.googleUser.create({
      data: googleDto,
    });
  }
}
