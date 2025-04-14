import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CourseEntity } from './course.entity';
import { Prisma } from '.prisma/client';
import { generateRandomNumber } from 'src/utils/random.utils';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findRandomCourseByFilter(filter: Prisma.CourseFindManyArgs): Promise<CourseEntity[]> {
    const count = await this.prisma.course.count({ where: filter.where });
    const random = generateRandomNumber({ end: count - 1 });
    return this.prisma.course.findMany({
      take: 5,
      where: filter.where,
      skip: random,
    });
  }
}
