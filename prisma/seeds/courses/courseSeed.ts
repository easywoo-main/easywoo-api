import { CourseStatus, CourseType, PrismaClient } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'node:path';

export class CourseSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    if ((await prisma.course.findMany()).length > 0) {
      return;
    }

    const posts: Post[] = [];
    const tagPosts: TagPost[] = [];
    const tags: any[] = [];

    const readCsv = <T = any>(filePath: string, separator: string): Promise<T[]> => {
      return new Promise<T[]>((resolve, reject) => {
        const data: T[] = [];

        if (fs.existsSync(filePath)) {
          fs.createReadStream(filePath)
            .pipe(csv({ separator }))
            .on('data', (row: any) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (err) => {
              reject(err);
            });
        } else {
          reject(new Error(`File not found: ${filePath}`));
        }
      });
    };

    const postFilePath = path.join(__dirname, 'course.data.csv');
    const tagPostFilePath = path.join(__dirname, 'tagPost.data.csv');
    const tagFilePath = path.join(__dirname, '../tags/tag.data.csv');

    posts.push(...(await readCsv<Post>(postFilePath, ';')));
    tagPosts.push(...(await readCsv<TagPost>(tagPostFilePath, ';')));
    tags.push(...(await readCsv(tagFilePath, ';')));

    for (const post of posts.filter((post) => post.post_type === 'job_listing' && post.post_status === 'publish')) {
      const tagsIds: string[] = [];
      for (const tagPost of tagPosts) {
        if (post.ID === tagPost.object_id) {
          const tag = tags.find((t) => t.term_id === tagPost.term_taxonomy_id);
          if (tag) {
            const { slug } = tag;
            const tagRecord = await prisma.tag.findUnique({ where: { slug } });
            if (tagRecord) {
              tagsIds.push(tagRecord.id);
            }
          }
        }
      }

      await prisma.course.create({
        data: {
          title: post.post_title,
          content: post.post_content,
          status: CourseStatus.PUBLISH,
          type: CourseType.JOB_LISTING,
          tags: { connect: tagsIds.map((tagId) => ({ id: tagId })) },
        },
      });
    }
  }
}

interface Post {
  ID: string;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: string;
  guid: string;
  menu_order: string;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
}

interface TagPost {
  object_id: string;
  term_taxonomy_id: string;
  term_order: string;
}
