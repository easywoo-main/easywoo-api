import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { CourseEntity } from './course.entity';
import { Prisma } from '.prisma/client';
import { generateRandomNumber } from 'src/utils/random.utils';

@Injectable()
export class CourseRepository {
  private readonly  courseRepository: Prisma.CourseDelegate;
  constructor(repository: Repository) {
    this.courseRepository = repository.course
  }

  public async findRandomCourseByFilter(filter: Prisma.CourseFindManyArgs): Promise<CourseEntity[]> {
    const count = await this.courseRepository.count({ where: filter.where });
    const random = generateRandomNumber({ end: count - 1 });
    return this.courseRepository.findMany({
      take: 5,
      where: filter.where,
      skip: random,
    });
  }
}
