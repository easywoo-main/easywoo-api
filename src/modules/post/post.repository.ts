import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PostEntity } from './post.entity';
import { Prisma } from '.prisma/client';
import { generateRandomNumber } from 'src/utils/random.utils';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findRandomPostByFilter(filter: Prisma.PostFindManyArgs): Promise<PostEntity[]> {
    console.log('filter', typeof filter.where);

    const count = await this.prisma.post.count({ where: filter.where });
    const random = generateRandomNumber({ end: count - 1 });
    console.log('count', count);
    console.log('random', random);
    console.log('filter', typeof filter);
    return await this.prisma.post.findMany({
      take: 5,
      where: filter.where,
      skip: random,
    });
  }
}
