import { DataSource } from 'typeorm';
import {Questionnaire} from "../../modules/questionnaire/questionnaire.entity";
import {QuestionsType} from "../../modules/questionnaire/questionsType.enum";

export async function questionnaireSeed(dataSource: DataSource) {
  const quizRepository = dataSource.getRepository(Questionnaire);

  await quizRepository.save([
        {
          step: 1,
          question: 'What is your gender?',
          answers: ['Male', 'Female', 'Non-binary'],
          type: QuestionsType.single,
        },
        {
          step: 1,
          question: 'What is your sexual orientation?',
          answers: ['Straight', 'Gay', 'Bisexual', 'Other'],
          type: QuestionsType.single,
        },
        {
          step: 1,
          question: 'How old are you?',
          answers: ['18-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-60', '60+'],
          type: QuestionsType.single,
        },
        {
          step: 2,
          question: 'How socially active are you?',
          answers: ['Not active', 'Somewhat active', 'Active', 'Very active', 'Hooked'],
          type: QuestionsType.slider,
        },
        {
          step: 2,
          question: 'How confident are you in social situations?',
          answers: ['Not at all', 'Just trying', 'I am okay with it', 'Confident', 'Very confident'],
          type: QuestionsType.slider,
        },
        {
          step: 3,
          question: 'Where do you usually socialize?',
          answers: ['Venues', 'At home with friends', 'Nowhere', 'On social media', 'Other'],
          type: QuestionsType.multiple,
        },
        {
          step: 3,
          question: 'What type of relationships are you looking for?',
          answers: ['Casual', 'Serious', 'Sexual', 'Friendship', 'Committed', 'Situationship', 'In a relationship'],
          type: QuestionsType.multiple,
        },
        {
          step: 4,
          question: 'Which personality traits describe you best?',
          answers: ['Adventurous', 'Ambitious', 'Charitable', 'Dynamic', 'Humorous', 'Independent', 'Loyal', 'Passionate', 'Practical', 'Romantic', 'Sensitive', 'Sociable', 'Trustworthy', 'Well-read'],
          type: QuestionsType.multiple,
        },
        {
          step: 5,
          question: 'What are your biggest challenges in dating or social life?',
          answers: ['Confidence', 'Communication', 'Appearance', 'Weight', 'Social life', 'Being too busy', 'Not knowing how to start', 'Financial instability', 'Pressure from others'],
          type: QuestionsType.multiple,
        },
        {
          step: 6,
          question: 'What are your personal goals?',
          answers: ['Finding a match', 'Improving social life', 'Building confidence', 'Career growth', 'Financial stability', 'Getting over an ex', 'Better physical appearance'],
          type: QuestionsType.multiple,
        },
        {
          step: 6,
          question: 'What is your ideal timeframe to achieve these goals?',
          answers: ['1 month', '6 months', '1 year', 'No specific timeframe', 'Not sure'],
          type: QuestionsType.single,
        },
        {
          step: 7,
          question: 'How important is physical appearance in a partner?',
          answers: ['Not important', 'Somewhat important', 'Important', 'Very important'],
          type: QuestionsType.single,
        },
        {
          step: 7,
          question: 'What age group do you prefer in a partner?',
          answers: ['18-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-60', '60+'],
          type: QuestionsType.single,
        },
        {
          step: 8,
          question: 'What qualities do you look for in a partner?',
          answers: ['Independent', 'Sociable', 'Ambitious', 'Adventurous', 'Shy', 'Passionate', 'Trustworthy', 'Romantic', 'Loyal', 'Smart', 'Financially successful', 'Environmentally aware', 'Pet lover', 'Vegetarian', 'Non-drinker', 'Casual drinker', 'Tall', 'Short'],
          type: QuestionsType.multiple,
        },
        {
          step: 9,
          question: 'Do you believe in zodiac compatibility?',
          answers: ['I don’t mind', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
          type: QuestionsType.multiple,
        },
        {
          step: 10,
          question: 'Have you come out about your identity?',
          answers: ['To family', 'To friends', 'To both family and friends', 'To society', 'I want to', 'I don’t want to'],
          type: QuestionsType.single,
        },
        {
          step: 10,
          question: 'Do you feel accepted by your community?',
          answers: ['Yes', 'No'],
          type: QuestionsType.single,
        },
        {
          step: 10,
          question: 'Do you accept your own sexuality?',
          answers: ['Yes', 'No', 'Still figuring it out'],
          type: QuestionsType.single,
        },
        {
          step: 10,
          question: 'Do you feel pressured to conform to societal expectations?',
          answers: ['Yes', 'No'],
          type: QuestionsType.single,
        },
      ]
  );
}
