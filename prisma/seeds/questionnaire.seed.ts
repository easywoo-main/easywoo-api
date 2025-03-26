import { PrismaClient, QuestionsType } from "@prisma/client";

async function main(prisma: PrismaClient) {
    const questions = [
        {
            step: 1,
            question: 'What is your gender?',
            answers: [
                { answer: "Male", name: "male" },
                { answer: "Female", name: "female" },
                { answer: "Non-binary", name: "nonBinary" }
            ],
            name: "gender",
            type: QuestionsType.single,
        },
        {
            step: 1,
            question: 'What is your sexual orientation?',
            answers: [
                { answer: "Straight", name: "straight" },
                { answer: "Gay", name: "gay" },
                { answer: "Bisexual", name: "bisexual" },
                { answer: "Other", name: "other" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 1,
            question: 'How old are you?',
            answers: [
                { answer: "18-20", name: "18-20" },
                { answer: "21-25", name: "21-25" },
                { answer: "26-30", name: "26-30" },
                { answer: "31-35", name: "31-35" },
                { answer: "36-40", name: "36-40" },
                { answer: "41-45", name: "41-45" },
                { answer: "46-50", name: "46-50" },
                { answer: "51-60", name: "51-60" },
                { answer: "60+", name: "60+" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 2,
            question: 'How socially active are you?',
            answers: [
                { answer: "Not active", name: "notActive" },
                { answer: "Somewhat active", name: "somewhatActive" },
                { answer: "Active", name: "active" },
                { answer: "Very active", name: "veryActive" },
                { answer: "Hooked", name: "hooked" }
            ],
            type: QuestionsType.slider,
        },
        {
            step: 2,
            question: 'How confident are you in social situations?',
            answers: [
                { answer: "Not at all", name: "notAtAll" },
                { answer: "Just trying", name: "justTrying" },
                { answer: "I am okay with it", name: "okayWithIt" },
                { answer: "Confident", name: "confident" },
                { answer: "Very confident", name: "veryConfident" }
            ],
            type: QuestionsType.slider,
        },
        {
            step: 3,
            question: 'Where do you usually socialize?',
            answers: [
                { answer: "Venues", name: "venues" },
                { answer: "At home with friends", name: "homeWithFriends" },
                { answer: "Nowhere", name: "nowhere" },
                { answer: "On social media", name: "socialMedia" },
                { answer: "Other", name: "other" }
            ],
            type: QuestionsType.multiple,
        },
        {
            step: 3,
            question: 'What type of relationships are you looking for?',
            answers: [
                { answer: "Casual", name: "casual" },
                { answer: "Serious", name: "serious" },
                { answer: "Sexual", name: "sexual" },
                { answer: "Friendship", name: "friendship" },
                { answer: "Committed", name: "committed" },
                { answer: "Situationship", name: "situationship" },
                { answer: "In a relationship", name: "inARelationship" }
            ],
            type: QuestionsType.multiple,
        },
        {
            step: 4,
            question: 'Which personality traits describe you best?',
            answers: [
                { answer: "Adventurous", name: "adventurous" },
                { answer: "Ambitious", name: "ambitious" },
                { answer: "Charitable", name: "charitable" },
                { answer: "Dynamic", name: "dynamic" },
                { answer: "Humorous", name: "humorous" },
                { answer: "Independent", name: "independent" },
                { answer: "Loyal", name: "loyal" },
                { answer: "Passionate", name: "passionate" },
                { answer: "Practical", name: "practical" },
                { answer: "Romantic", name: "romantic" },
                { answer: "Sensitive", name: "sensitive" },
                { answer: "Sociable", name: "sociable" },
                { answer: "Trustworthy", name: "trustworthy" },
                { answer: "Well-read", name: "wellRead" }
            ],
            type: QuestionsType.multiple,
        },
        {
            step: 5,
            question: 'What are your biggest challenges in dating or social life?',
            answers: [
                { answer: "Confidence", name: "confidence" },
                { answer: "Communication", name: "communication" },
                { answer: "Appearance", name: "appearance" },
                { answer: "Weight", name: "weight" },
                { answer: "Social life", name: "socialLife" },
                { answer: "Being too busy", name: "beingTooBusy" },
                { answer: "Not knowing how to start", name: "notKnowingHowToStart" },
                { answer: "Financial instability", name: "financialInstability" },
                { answer: "Pressure from others", name: "pressureFromOthers" }
            ],
            type: QuestionsType.multiple,
        },
        {
            step: 6,
            question: 'What are your personal goals?',
            answers: [
                { answer: "Finding a match", name: "findingAMatch" },
                { answer: "Improving social life", name: "improvingSocialLife" },
                { answer: "Building confidence", name: "buildingConfidence" },
                { answer: "Career growth", name: "careerGrowth" },
                { answer: "Financial stability", name: "financialStability" },
                { answer: "Getting over an ex", name: "gettingOverAnEx" },
                { answer: "Better physical appearance", name: "betterPhysicalAppearance" }
            ],
            type: QuestionsType.multiple,
        },
        {
            step: 6,
            question: 'What is your ideal timeframe to achieve these goals?',
            answers: [
                { answer: "1 month", name: "1Month" },
                { answer: "6 months", name: "6Months" },
                { answer: "1 year", name: "1Year" },
                { answer: "No specific timeframe", name: "noSpecificTimeframe" },
                { answer: "Not sure", name: "notSure" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 7,
            question: 'How important is physical appearance in a partner?',
            answers: [
                { answer: "Not important", name: "notImportant" },
                { answer: "Somewhat important", name: "somewhatImportant" },
                { answer: "Important", name: "important" },
                { answer: "Very important", name: "veryImportant" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 7,
            question: 'What age group do you prefer in a partner?',
            answers: [
                { answer: "18-20", name: "18-20" },
                { answer: "21-25", name: "21-25" },
                { answer: "26-30", name: "26-30" },
                { answer: "31-35", name: "31-35" },
                { answer: "36-40", name: "36-40" },
                { answer: "41-45", name: "41-45" },
                { answer: "46-50", name: "46-50" },
                { answer: "51-60", name: "51-60" },
                { answer: "60+", name: "60+" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 8,
            question: 'What qualities do you look for in a partner?',
            answers: [
                { answer: "Independent", name: "independent" },
                { answer: "Sociable", name: "sociable" },
                { answer: "Ambitious", name: "ambitious" },
                { answer: "Adventurous", name: "adventurous" },
                { answer: "Shy", name: "shy" },
                { answer: "Passionate", name: "passionate" },
                { answer: "Trustworthy", name: "trustworthy" },
                { answer: "Romantic", name: "romantic" },
                { answer: "Loyal", name: "loyal" },
                { answer: "Smart", name: "smart" },
                { answer: "Financially successful", name: "financiallySuccessful" },
                { answer: "Environmentally aware", name: "environmentallyAware" },
                { answer: "Pet lover", name: "petLover" },
                { answer: "Vegetarian", name: "vegetarian" },
                { answer: "Non-drinker", name: "nonDrinker" },
                { answer: "Casual drinker", name: "casualDrinker" },
                { answer: "Tall", name: "tall" },
                { answer: "Short", name: "short" }
            ],
            type: QuestionsType.multiple,
        },
        {
            step: 9,
            question: 'Do you believe in zodiac compatibility?',
            answers: [
                { answer: "I don’t mind", name: "idontMind" },
                { answer: "Aries", name: "aries" },
                { answer: "Taurus", name: "taurus" },
                { answer: "Gemini", name: "gemini" },
                { answer: "Cancer", name: "cancer" },
                { answer: "Leo", name: "leo" },
                { answer: "Virgo", name: "virgo" },
                { answer: "Libra", name: "libra" },
                { answer: "Scorpio", name: "scorpio" },
                { answer: "Sagittarius", name: "sagittarius" },
                { answer: "Capricorn", name: "capricorn" },
                { answer: "Aquarius", name: "aquarius" },
                { answer: "Pisces", name: "pisces" }
            ],
            type: QuestionsType.multiple,
        },
        {
            step: 10,
            question: 'Have you come out about your identity?',
            answers: [
                { answer: "To family", name: "toFamily" },
                { answer: "To friends", name: "toFriends" },
                { answer: "To both family and friends", name: "toFamilyAndFriends" },
                { answer: "To society", name: "toSociety" },
                { answer: "I want to", name: "iWantTo" },
                { answer: "I don’t want to", name: "idontWantTo" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 10,
            question: 'Do you feel accepted by your community?',
            answers: [
                { answer: "Yes", name: "yes" },
                { answer: "No", name: "no" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 10,
            question: 'Do you accept your own sexuality?',
            answers: [
                { answer: "Yes", name: "yes" },
                { answer: "No", name: "no" },
                { answer: "Still figuring it out", name: "stillFiguringItOut" }
            ],
            type: QuestionsType.single,
        },
        {
            step: 10,
            question: 'Do you feel pressured to conform to societal expectations?',
            answers: [
                { answer: "Yes", name: "yes" },
                { answer: "No", name: "no" }
            ],
            type: QuestionsType.single,
        },
    ];

    // Додавання кожного питання разом з відповідями
    for (const question of questions) {
        await prisma.questionnaire.upsert({
            where: { question: question.question },
            create: {
                step: question.step,
                question: question.question,
                name: question.name,
                type: question.type,
                answer: {
                    create: question.answers.map(answer => ({
                        answer: answer.answer,
                        name: answer.name,
                    }))
                }
            },
            update: {
                step: question.step,
                question: question.question,
                name: question.name,
                type: question.type,
            }
        });
    }
}

export { main as questionnaireSeed };
