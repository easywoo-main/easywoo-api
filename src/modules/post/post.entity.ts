import { Post, PostStatus, PostType } from '@prisma/client';


export class PostEntity implements Post {
    id: string;
    title: string;
    type: PostType;
    status: PostStatus;
    content: string;
    createdAt: Date;
    updatedAt: Date;

}