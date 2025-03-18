import {questionnaireSeed} from "./questionnaire.seed";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function main() {
    await questionnaireSeed(prisma);
    console.log("Seeding completed");
})()