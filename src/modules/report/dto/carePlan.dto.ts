import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from '../../post/post.entity';

export class CarePlanDto {
  @ApiProperty({
    description: 'A sentence describing the care plan',
  })
  sentence: string;

  @ApiProperty({
    description: 'An array of related posts',
    type: [PostEntity],
  })
  posts: PostEntity[];
}
