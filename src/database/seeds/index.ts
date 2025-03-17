import { AppDataSource } from '../data-source';
import { quizSeed } from './quiz.seed';

async function main() {
  await quizSeed(AppDataSource);
}

main()
  .then(() => {
    console.log('Seeding success');
  })
  .catch((e) => {
    console.log('Seeding error: ', e);
  });
