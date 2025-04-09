import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CourseEntity } from './course.entity';
import { Prisma } from '.prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly postRepository: CourseRepository) {}

  public async findRandomPostByFilter(filter: Prisma.CourseFindManyArgs): Promise<CourseEntity[]> {
    return this.postRepository.findRandomCourseByFilter(filter);
  }
}
