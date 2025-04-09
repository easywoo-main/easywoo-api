import { PrismaClient } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'node:path';

const FILE_PATH = path.resolve(__dirname, 'tag.data.csv');

export class TagSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const tags = await new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(FILE_PATH)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });

    for (const tag of tags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: { name: tag.name, slug: tag.slug },
        create: { name: tag.name, slug: tag.slug },
      });
    }
  }
}
