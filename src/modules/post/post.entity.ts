import { Post, PostStatus, PostType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PostEntity implements Post {
  @ApiProperty({ description: 'Unique identifier for the post', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Title of the post' })
  title: string;

  @ApiProperty({ description: 'Type of the post', enum: PostType })
  type: PostType;

  @ApiProperty({ description: 'Status of the post', enum: PostStatus })
  status: PostStatus;

  @ApiProperty({ description: 'Content of the post' })
  content: string;

  @ApiProperty({ description: 'Date when the post was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the post was last updated' })
  updatedAt: Date;
}
