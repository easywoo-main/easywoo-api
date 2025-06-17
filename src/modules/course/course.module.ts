import { Module, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';

@Module({
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export class CourseModule {}
