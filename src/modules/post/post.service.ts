import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { Prisma } from '.prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) { }

  public async findRandomPostByFilter(filter: Prisma.PostFindManyArgs): Promise<PostEntity[]> {
    return this.postRepository.findRandomPostByFilter(filter);
  }
}
