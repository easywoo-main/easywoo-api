import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PostEntity } from './post.entity';
import { Prisma } from '.prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findRandomPostByFilter(filter: Prisma.PostFindManyArgs): Promise<PostEntity[]> {
    const count = await this.prisma.post.count({ where: filter.where });
    const random = generateRandomNumber({ end: count - 1 });
    return await this.prisma.post.findMany({
      take: 5,
      ...filter,
      skip: random
    });
  }
}
