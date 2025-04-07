import { PostEntity } from '../../post/post.entity';

export class CarePlanDto {
  sentence: string;
  posts: PostEntity[];
}
