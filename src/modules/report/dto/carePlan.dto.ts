import { ApiProperty } from '@nestjs/swagger';
import { CourseEntity } from '../../course/course.entity';

export class CarePlanDto {
  @ApiProperty({
    description: 'A sentence describing the care plan',
  })
  sentence: string;

  @ApiProperty({
    description: 'An array of related courses',
    type: [CourseEntity],
  })

  course: CourseEntity[];
}
