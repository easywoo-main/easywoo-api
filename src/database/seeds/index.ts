import { AppDataSource } from '../data-source';
import { questionnaireSeed } from './questionnaire.seed';

async function main() {
  await questionnaireSeed(AppDataSource);
}

AppDataSource.initialize()
    .then(main)
    .then(()=>{
        console.log('Database seeded successfully');
    }).catch((e)=>{
    console.log('Database connection error: ', e);
})