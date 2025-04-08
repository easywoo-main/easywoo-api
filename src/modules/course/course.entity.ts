import { Course, CourseStatus, CourseType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CourseEntity implements Course {
  @ApiProperty({ description: 'Unique identifier for the course', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Title of the course' })
  title: string;

  @ApiProperty({ description: 'Type of the course', enum: CourseType })
  type: CourseType;

  @ApiProperty({ description: 'Status of the course', enum: CourseStatus })
  status: CourseStatus;

  @ApiProperty({ description: 'Content of the course' })
  content: string;

  @ApiProperty({ description: 'Date when the course was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the course was last updated' })
  updatedAt: Date;
}
