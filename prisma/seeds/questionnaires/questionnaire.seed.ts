import { PrismaClient, QuestionsType } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';

export class QuestionnaireSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const questions = [
      {
        step: 1,
        question: 'What is your gender?',
        answers: [
          { answer: 'Male', name: 'male' },
          { answer: 'Female', name: 'female' },
          { answer: 'Non-binary', name: 'nonBinary' },
        ],
        name: 'gender',
        type: QuestionsType.SINGLE,
      },
      {
        step: 1,
        question: 'What is your sexual orientation?',
        answers: [
          { answer: 'Straight', name: 'straight' },
          { answer: 'Gay', name: 'gay', evaluation: { 'other.living_with_parents': 3 } },
          { answer: 'Bisexual', name: 'bisexual', evaluation: { 'other.living_with_parents': 3 } },
          { answer: 'Non binary', name: 'nonBinary', evaluation: { 'other.living_with_parents': 3 } },
          { answer: 'Other', name: 'other' },
        ],
        name: 'sexualOrientation',
        type: QuestionsType.SINGLE,
      },
      {
        step: 1,
        question: 'Ethnicity',
        answers: [
          { answer: 'White', name: 'white' },
          { answer: 'Black', name: 'black' },
          { answer: 'Asian', name: 'asian' },
          { answer: 'Mixed', name: 'mixed' },
          { answer: 'Other', name: 'other' },
        ],
        name: 'ethnicity',
        type: QuestionsType.SINGLE,
      },
      {
        step: 1,
        question: 'Your body type',
        answers: [
          { answer: "I don't mind", name: 'dontMind' },
          { answer: 'Heavy set', name: 'heavySet' },
          { answer: 'Athletic', name: 'athletic' },
          { answer: 'Slim', name: 'slim' },
          { answer: 'Skinny', name: 'skinny' },
          { answer: 'A few extra kilos', name: 'fewExtraKilos' },
          { answer: 'Overweight', name: 'overweight' },
        ],
        name: 'bodyType',
        type: QuestionsType.MULTIPLE,
      },
      {
        step: 1,
        question: 'How old are you?',
        answers: [
          { answer: '18-20', name: '18-20' },
          { answer: '21-25', name: '21-25' },
          { answer: '26-30', name: '26-30' },
          { answer: '31-35', name: '31-35' },
          { answer: '36-40', name: '36-40' },
          { answer: '41-45', name: '41-45' },
          { answer: '46-50', name: '46-50' },
          { answer: '51-60', name: '51-60' },
          { answer: '60+', name: '60+' },
        ],
        name: 'age',
        type: QuestionsType.SINGLE,
      },
      {
        step: 1,
        question: 'What is your current relationship status?',
        answers: [
          { answer: 'Single', name: 'single' },
          { answer: 'Commited relationship/Married', name: 'commitedRelationship' },
          { answer: "It's complicated", name: 'itsComplicated' },
          { answer: 'Separated / Divorced / Widower', name: 'divorced' },
        ],
        name: 'relationshipStatus',
        type: QuestionsType.SINGLE,
      },
      {
        step: 1,
        question: 'Do you have children',
        answers: [
          { answer: 'Yes', name: 'yes' },
          { answer: 'No', name: 'no' },
        ],
        name: 'children',
        type: QuestionsType.SINGLE,
        midStepTexts: ["Hey! Welcome to easywooYour Personal Empowerment Companion for:- Fixing your current relationship struggles- Transforming your dating game- Finding a relationship that truly fits you- Boosting your confidence- Improving your communication skillsOur users experience an 80% improvement rate with our personalized coaching content."]
      },
      {
        step: 2,
        question: 'How socially active are you?',
        answers: [
          {
            answer: 'Not active',
            name: 'notActive',
            evaluation: { 'opportunity.wrong_use_SM': 15, 'opportunity.mate_hungs_out': 5 },
          }, //not_active
          {
            answer: 'Somewhat active',
            name: 'somewhatActive',
            evaluation: { 'opportunity.wrong_use_SM': 10, 'opportunity.mate_hungs_out': 3 },
          }, // somewhat_active
          { answer: 'Active', name: 'active', evaluation: { 'opportunity.wrong_use_SM': 10 } },
          { answer: 'Very active', name: 'veryActive', evaluation: { 'opportunity.wrong_use_SM': 15 } },
          { answer: 'Hooked', name: 'hooked' },
        ],
        name: 'socialActivity',
        type: QuestionsType.SLIDER,
      },
      {
        step: 2,
        question: 'How confident are you in social situations?',
        answers: [
          { answer: 'Not at all', name: 'notAtAll' },
          {
            answer: 'Just trying',
            name: 'justTrying',
            evaluation: { 'opportunity.wrong_use_SM': 5, 'opportunity.mate_hungs_out': 3 },
          },
          { answer: 'I am okay with it', name: 'okayWithIt', evaluation: { 'opportunity.wrong_use_SM': 3 } },
          { answer: 'Confident', name: 'confident', evaluation: { 'opportunity.wrong_use_SM': 5 } },
          { answer: 'Very confident', name: 'veryConfident' },
          {
            answer: 'Not familiar',
            name: 'notFamiliar',
            evaluation: { 'opportunity.mate_hungs_out': 3, 'awareness_objectives.scared_move_relationship': 15, 'opportunity.wrong_use_SM': 15 },
          }, //not_familiar
        ],
        name: 'confidenceInSocialMedia',
        type: QuestionsType.SLIDER,
      },
      {
        step: 2,
        question: 'Where do you usually socialize?',
        answers: [
          { answer: 'At a restaurant', name: 'restaurant' },
          { answer: 'At a club', name: 'club' },
          { answer: 'At the gym', name: 'gym' },
          { answer: 'At a bar', name: 'bar' },
          { answer: 'Sports / activities', name: 'activities' },
          { answer: 'Cafés', name: 'cafes' },
          {
            answer: 'At home with friends',
            name: 'home',
            evaluation: { 'self_improvement.loneliness_stress_motivation': 3 },
          },
          {
            answer: 'Nowhere',
            name: 'nowhere',
            evaluation: { 'opportunity.wrong_use_SM': 15, 'self_improvement.loneliness_stress_motivation': 15 },
          },
          {
            answer: 'Social media',
            name: 'socialMedia',
            evaluation: {
              'opportunity.wrong_use_SM': -15,
              'opportunity.mate_hungs_out': 3,
              'self_improvement.loneliness_stress_motivation': 3,
            },
          }, //social_media
          { answer: 'Work', name: 'work' },
          { answer: 'College', name: 'college' },
        ],
        name: 'socialize', //social_at
        type: QuestionsType.MULTIPLE,
      },
      {
        step: 2,
        question: 'What type of relationships are you looking for?',
        answers: [
          { answer: 'Casual no expectation', name: 'casual', evaluation: { 'other.just_date': 5 } },
          { answer: 'Serious relationship', name: 'serious' },
          { answer: 'Casual sex', name: 'sexual', evaluation: { 'other.just_date': 10 } },
          { answer: 'Friendship', name: 'friendship', evaluation: { 'other.looking_friends': 15 } },
          { answer: 'Committed relationship', name: 'committed' },
          { answer: 'Situationship', name: 'situationship', evaluation: { 'other.just_date': 5 } },
          { answer: 'In a relationship but want to meet other people', name: 'inARelationship' },
        ],
        name: 'mateRelationship', // relationship
        type: QuestionsType.MULTIPLE,
        midStepTexts: ["This might matter to you...63.8% of the world's population uses social media. Choosing to avoid social media might lead to feelings of isolation, especially if friends and family connect online. It's natural to feel left out of the loop—your connections matter!",
        "Confident social media use is wonderful!Just remember, moderation is key to staying balanced and healthy.Average daily social media use: 2 hours 21 minutes.- This is considered excessive for mental health.- Risks include feelings of inadequacy, anxiety, stress, social isolation and FOMO",
        "Turns out, your screen time might actually be helping!People who dive into online support groups or communities often feel less stressed and anxious. The best part? The anonymity and 24/7 access make it super easy to reach out when you need a boost."]
      },
      {
        step: 3,
        question: "Let's see what type of person you are. Select all that apply.",
        answers: [
          {
            answer: 'Independent',
            name: 'independent',
            evaluation: {
              'opportunity.mate_hungs_out': -2,
              'self_improvement.commitment_issues': 4,
              'other.living_with_parents': -5,
            },
          },
          { answer: 'Sociable', name: 'sociable', evaluation: { 'opportunity.mate_hungs_out': -3 } },
          { answer: 'Loyal', name: 'loyal' },
          { answer: 'Charitable', name: 'charitable' },
          { answer: 'Trustworthy', name: 'trustworthy' },
          { answer: 'Environmentally aware', name: 'environmentallyAware' },
          { answer: 'Ambitious', name: 'ambitious', evaluation: { 'self_improvement.commitment_issues': 4 } },
          {
            answer: 'Reserved',
            name: 'reserved',
            evaluation: { 'awareness_objectives.picky': 3, 'opportunity.mate_hungs_out': 2 },
          }, // reserved
          {
            answer: 'Adventurous',
            name: 'adventurous',
            evaluation: { 'opportunity.mate_hungs_out': -2, 'self_improvement.commitment_issues': 3 },
          },
          {
            answer: 'Shy',
            name: 'shy',
            evaluation: {
              'opportunity.mate_hungs_out': 3,
              'self_improvement.sexuality_problems': 2,
              'self_improvement.loneliness_stress_motivation': 2,
            },
          },
          { answer: 'Passionate', name: 'passionate' },
          { answer: 'Possessive', name: 'possessive' },
          { answer: 'Practical', name: 'practical' },
          {
            answer: 'Romantic',
            name: 'romantic',
            evaluation: {
              'opportunity.mate_hungs_out': 2,
              'self_improvement.commitment_issues': 3,
              'self_improvement.sexuality_problems': 2,
              'self_improvement.loneliness_stress_motivation': 2,
            },
          },
          { answer: 'Dynamic', name: 'dynamic' },
          {
            answer: 'Sexual / Erotic',
            name: 'sexualErotic',
            evaluation: {
              'self_improvement.commitment_issues': 5,
              'self_improvement.sexuality_problems': 2,
              'other.living_with_parents': 5,
            },
          }, //sexual_erotic
          {
            answer: 'Prudent',
            name: 'prudent',
            evaluation: { 'opportunity.mate_hungs_out': 3, 'self_improvement.sexuality_problems': 3 },
          },
          {
            answer: 'Sensitive',
            name: 'sensitive',
            evaluation: { 'opportunity.mate_hungs_out': 1, 'self_improvement.loneliness_stress_motivation': 2 },
          },
          { answer: 'Humorous', name: 'humorous' },
          { answer: 'Spiritual', name: 'spiritual' },
          {
            answer: 'Religious',
            name: 'religious',
            evaluation: {
              'opportunity.mate_hungs_out': 2,
              'self_improvement.commitment_issues': 5,
              'self_improvement.sexuality_problems': 4,
            },
          },
          {
            answer: 'Well Read / Intellectual',
            name: 'wellReadIntellectual',
            evaluation: { 'opportunity.mate_hungs_out': 2 },
          },
          {
            answer: 'Successful',
            name: 'successful',
            evaluation: {
              'opportunity.mate_hungs_out': -1,
              'self_improvement.commitment_issues': 4,
              'self_improvement.loneliness_stress_motivation': 3,
              'other.financial_instability': -15,
            },
          }, //financially_successful
          {
            answer: 'Likes tidiness',
            name: 'likesTidiness',
            evaluation: {
              'opportunity.mate_hungs_out': 4,
              'self_improvement.sexuality_problems': 3,
              'self_improvement.loneliness_stress_motivation': 2,
            },
          }, //tidiness_cleanliness
          { answer: 'Pet lover', name: 'petLover' },
          { answer: 'Vegetarian / Vegan', name: 'vegetarianVegan' },
          { answer: 'Smoker', name: 'smoker' },
          { answer: 'Non drinker', name: 'nonDrinker', evaluation: { 'opportunity.mate_hungs_out': 2 } },
          { answer: 'Casual drinker', name: 'casualDrinker' },
          {
            answer: 'Regular drinker',
            name: 'regularDrinker',
            evaluation: {
              'self_improvement.sexuality_problems': 5,
              'self_improvement.loneliness_stress_motivation': 1,
            },
          },
          { answer: 'Bald', name: 'bald' },
          { answer: 'Facial hair', name: 'facialHair' },
          { answer: 'Want children', name: 'wantChildren' },
          { answer: 'Body piercings', name: 'bodyPiercings' },
          { answer: 'Have tattoos', name: 'haveTattoos' },
        ],
        name: 'personType', //persona
        type: QuestionsType.MULTIPLE,
        },
      {
        step: 4,
        question: 'What hurdles are you facing right now? Select all that apply.',
        answers: [
          {
            answer: 'Confidence issues',
            name: 'confidenceIssues',
            evaluation: {
              'opportunity.sexuality_lgbt': 4,
              'opportunity.no_social_life': 3,
              'self_improvement.communication_problems': 4,
              'self_improvement.commitment_issues': 3,
              'self_improvement.sexuality_problems': 3,
              'self_improvement.loneliness_stress_motivation': 3,
            },
          }, //Confidence_issues
          {
            answer: 'Communication problems',
            name: 'communicationProblems',
            'self_improvement.communication_problems': 5,
          }, //communication_problems
          {
            answer: 'I feel I am too old to date',
            name: 'tooOldToDate',
            evaluation: {
              'awareness_objectives.age': 15,
              'self_improvement.commitment_issues': 3,
              'self_improvement.loneliness_stress_motivation': 2,
              'other.fertility_issues': 15,
            },
          }, //getting_old
          { answer: 'Running out of time to start family', name: 'runningOutOfTime' },
          {
            answer: 'Not happy with appearance',
            name: 'notHappyWithAppearance',
            evaluation: {
              'awareness_objectives.sexuality_lgbt': 4,
              'opportunity.no_social_life': 3,
              'opportunity.mate_hungs_out': 3,
              'self_improvement.appearance_issues': 15,
              'self_improvement.communication_problems': 3,
              'self_improvement.commitment_issues': 2,
              'self_improvement.sexuality_problems': 3,
            },
          }, //appearance_happiness
          {
            answer: 'Not happy with my social life',
            name: 'notHappyWithSocialLife',
            evaluation: {
              'awareness_objectives.new_location': 5,
              'opportunity.sexuality_lgbt': 5,
              'self_improvement.communication_problems': 3,
              'self_improvement.loneliness_stress_motivation': 5,
            },
          }, // not_happy_with_social_life
          {
            answer: 'Too busy to date',
            name: 'busyToDate',
            evaluation: {
              'opportunity.no_social_life': 3,
              'opportunity.mate_hungs_out': 4,
              'self_improvement.commitment_issues': 2,
              'self_improvement.time_management': 15,
            },
          }, // busy_to_date
          {
            answer: 'Don’t know where to find dates / friends',
            name: 'dontKnowWhereToFindDates',
            evaluation: { 'opportunity.mate_hungs_out': 15 },
          }, //where_to_date
          {
            answer: 'No single friends to go out with',
            name: 'noSingleFriends',
            evaluation: {
              'opportunity.wrong_use_SM': 15,
              'opportunity.new_location': 5,
              'opportunity.sexuality_lgbt': 3,
              'opportunity.no_social_life': 5,
              'opportunity.mate_hungs_out': 5,
              'self_improvement.communication_problems': 3,
              'self_improvement.loneliness_stress_motivation': 5,
            },
          }, //no_single_friends
          { answer: 'I want to get out of current relationship', name: 'wantToGetOutOfCurrentRelationship' },
          { answer: 'Burned in relationships', name: 'burnedInRelationships' },
          {
            answer: 'Stuck on my ex',
            name: 'stuckOnMyEx',
            evaluation: {
              'opportunity.no_social_life': 3,
              'self_improvement.get_over_ex': 15,
              'self_improvement.commitment_issues': -3,
            },
          }, // stuck_ex
          {
            answer: 'I want to increase my dating chances',
            name: 'increaseDatingChances',
            evaluation: { 'other.just_date': 15 },
          }, //increase_dating_chances
          {
            answer: 'My online dates don’t get a follow up',
            name: 'noFollowUpOnlineDates',
            evaluation: { 'awareness_objectives.no_follow': 15 },
          },
          {
            answer: 'I often end up in the friend zone',
            name: 'endUpInFriendZone',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 15,
              'opportunity.sexuality_lgbt': 4,
              'opportunity.no_social_life': 2,
              'self_improvement.commitment_issues': 1,
              'self_improvement.sexuality_problems': 5,
            },
          }, // friendzoned
          { answer: 'People I like don’t want to date me', name: 'peopleDontWantToDateMe' },
          {
            answer: 'Still living with parents',
            name: 'stillLivingWithParents',
            evaluation: { 'other.living_with_parents': 15 },
          }, //living_with_parents
          {
            answer: 'Financial instability',
            name: 'financialInstability',
            evaluation: {
              'opportunity.mate_hungs_out': 1,
              'self_improvement.communication_problems': 1,
              'self_improvement.loneliness_stress_motivation': 2,
              'other.financial_instability': 15,
            },
          }, //Financial_instability
          {
            answer: 'Getting Rejected',
            name: 'gettingRejected',
            evaluation: {
              'opportunity.sexuality_lgbt': 5,
              'opportunity.no_social_life': 2,
              'self_improvement.communication_problems': 2,
              'self_improvement.sexuality_problems': 3,
              'self_improvement.loneliness_stress_motivation': 3,
            },
          }, //getting_rejected
          {
            answer: 'Scared to breakup',
            name: 'scaredToBreakup',
            evaluation: {
              'opportunity.sexuality_lgbt': 4,
              'opportunity.no_social_life': 3,
              'opportunity.mate_hungs_out': 3,
              'self_improvement.communication_problems': 2,
              'self_improvement.loneliness_stress_motivation': 3,
            },
          }, //scared_to_breakup
          {
            answer: 'Pressure from family / society to start a family',
            name: 'pressureToStartFamily',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 3,
              'awareness_objectives.scared_move_relationship': 3,
              'self_improvement.sexuality_problems': 3,
            }, //family_pressure
          },
          {
            answer: 'Weight issues',
            name: 'weightIssues',
            evaluation: {
              'opportunity.no_social_life': 3,
              'opportunity.mate_hungs_out': 3,
              'self_improvement.appearance_issues': 15,
              'self_improvement.commitment_issues': 2,
              'self_improvement.sexuality_problems': 2,
              'self_improvement.loneliness_stress_motivation': 3,
              'self_improvement.weight_issues': 15,
            },
          }, //Weight_issues
          {
            answer: 'I am away from what I call home',
            name: 'awayFromHome',
            evaluation: {
              'opportunity.new_location': 15,
              'opportunity.no_social_life': 5,
              'opportunity.mate_hungs_out': 5,
              'other.living_with_parents': -15,
            },
          }, //far_from_home
        ],
        name: 'biggestChallenges', // pain_points
        type: QuestionsType.MULTIPLE,
        midStepTexts: ["This could uplift you! You embody an adventurous spirit paired with ambition, seeking new experiences while striving for your goals. It's an inspiring journey!",
          " This might resonate. You are a compassionate, trustworthy person whose sensitivity allows you to connect deeply with others and make a meaningful impact.",
          " This could uplift you! You are a unique blend of independence and passion, with a romantic heart that shines through your gentle, shy demeanor.",
          "This could inspire you... You are a tender-hearted individual, shy yet romantic, cherishing deep connections and beautiful moments while navigating your sensitive emotions."," You will appreciate this. You are an inspiring individual, driven by ambition and passion, embracing adventure while dynamically pursuing your dreams with enthusiasm and courage."," This might matter to you... Being a Highly Sensitive Person (HSP) is challenging yet beautiful; your depth fosters profound connections, making your emotional journey uniquely enriching.",": Embracing your unique traits unlocks your potential, leading to a happier, more authentic life. You truly deserve this journey of self-discovery!" ]
      },
      {
        step: 5,
        question: 'We are here to help you achieve your goals. Select all that apply.',
        answers: [
          { answer: 'Find relationship I match with', name: 'findRelationship' },
          {
            answer: 'Learn how to attract the people I like',
            name: 'learnAttractPeople',
            evaluation: { 'opportunity.wrong_use_SM': 15, 'opportunity.mate_hungs_out': 15 },
          }, // Learn_people_date
          {
            answer: 'Improve social life',
            name: 'improveSocialLife',
            evaluation: { 'opportunity.no_social_life': 10 },
          }, //social_life
          { answer: 'Find new friends', name: 'findNewFriends' },
          { answer: 'Start a family', name: 'startFamily', evaluation: { 'other.fertility_issues': 5 } }, //start_family
          { answer: 'Self development', name: 'selfDevelopment' },
          {
            answer: 'Improve self awareness',
            name: 'improveSelfAwareness',
            evaluation: { 'self_improvement.communication_problems': 5, 'self_improvement.commitment_issues': 5 },
          }, //improve_self_awareness
          {
            answer: 'Improve self confidence',
            name: 'improveSelfConfidence',
            evaluation: {
              'self_improvement.communication_problems': 5,
              'self_improvement.loneliness_stress_motivation': 5,
            },
          }, //improve_self_confidence
          {
            answer: 'Confidence move out relationship',
            name: 'confidenceMoveOutRelationship',
            evaluation: { 'self_improvement.get_over_ex': 5 },
          }, // confidence_move_out_relationship
          { answer: 'Improve a certain part of my physical appearance', name: 'improvePhysicalAppearance' },
          {
            answer: 'Improve body weight',
            name: 'improveBodyWeight',
            evaluation: { 'self_improvement.weight_issues': 15 },
          },
          {
            answer: 'Improve sexual life',
            name: 'improveSexualLife',
            evaluation: { 'self_improvement.sexuality_problems': 15 },
          }, //improve_sexual_life
          { answer: 'Further career', name: 'furtherCareer', evaluation: { 'other.further_career': 15 } }, // further_career
          { answer: 'Further education', name: 'furtherEducation' },
          { answer: 'Fix my finances', name: 'fixFinances', evaluation: { 'other.financial_instability': 15 } }, //fix_finances
          {
            answer: "Move out of parents' house",
            name: 'moveOutParentsHouse',
            evaluation: { 'other.living_with_parents': 15 },
          },
          {
            answer: 'I want to move out of my relationship',
            name: 'moveOutRelationship',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5 },
          }, //find_relationship_match
          { answer: 'Get over my ex', name: 'getOverEx', evaluation: { 'opportunity.sexuality_lgbt': 4 } },
          { answer: 'Get out of the friend zone', name: 'getOutFriendZone' },
        ],
        name: 'goals', //motivation_goals
        type: QuestionsType.SINGLE,
      },
      {
        step: 5,
        question: 'Do you have a time frame to reach your goals?',
        answers: [
          { answer: 'Yes, within a month', name: 'month' },
          { answer: 'Yes, within six months', name: 'sixMonth' },
          { answer: 'Yes, within the year', name: 'year' },
          { answer: 'Yes, but no firm timeframe', name: 'noFirmTimeframe' },
          { answer: 'No', name: 'no', evaluation: { 'awareness_objectives.wrong_choice_partner': 5 } },
        ],
        name: 'timeFrame',
        type: QuestionsType.SINGLE,
        midStepTexts: ["Feeling like a fraud?You're not alone—85% struggle with low self-esteem, and 82% face imposter syndrome. But you don't have to stay stuck there! easyWoo can elevate you to the confident 10%. :muscle::sparkles: ", "You will want to know this!Unlock a whole new level of Communication skills. Our research-backed approach helps you build skills that will empower you to take any relationship with confidence.", "Here is something worth knowing...89% of people think there's value in couples counsellingThe top barriers people face preventing them from going to couples counselling are:- The cost- Finding the right therapist - Convincing their partner- Time71% of people say they wish they were more adept at discussing big relationship topics or dealing with conflictIf any of the above resonate with you then you're a great fit for our accelerated program designed to speed up your relationship problems once and for all.","Here is a piece of wisdomEach step you take towards bettering yourself, is something to be proud of. Life can be tough, but it also has incredible opportunities ahead."]
      },
      {
        step: 6,
        question: 'How important is appearance to you?',
        answers: [
          { answer: 'Not important', name: 'notImportant', 'awareness_objectives.picky': -3 },
          { answer: 'Somewhat important', name: 'somewhatImportant' },
          {
            answer: 'Important',
            name: 'important',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 4,
              'awareness_objectives.picky': 3,
              'self_improvement.appearance_issues': 1,
            },
          },
          {
            answer: 'Very important',
            name: 'veryImportant',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 5,
              'awareness_objectives.picky': 4,
              'self_improvement.appearance_issues': 3,
            },
          },
        ],
        name: 'appearance', //look_importance
        type: QuestionsType.SINGLE,
      },
      {
        step: 6,
        question: 'What age groups interest you?',
        answers: [
          { answer: '18-20', name: '18-20' },
          { answer: '21-25', name: '21-25' },
          { answer: '26-30', name: '26-30' },
          { answer: '31-35', name: '31-35' },
          { answer: '36-40', name: '36-40' },
          { answer: '41-45', name: '41-45' },
          { answer: '46-50', name: '46-50' },
          { answer: '51-60', name: '51-60' },
          { answer: '60+', name: '60+' },
        ],
        name: 'mateAge',
        type: QuestionsType.SINGLE,
      },
      {
        step: 6,
        question: 'Is ethnicity important to you? Select all that apply.',
        answers: [
          { answer: "I don't mind", name: 'dontMind' },
          { answer: 'White', name: 'white' },
          { answer: 'Black', name: 'black' },
          { answer: 'Asian', name: 'asian' },
          { answer: 'Mixed', name: 'mixed' },
          { answer: 'Other', name: 'other' },
        ],
        name: 'mateEthnicity',
        type: QuestionsType.SINGLE,
      },
      {
        step: 6,
        question: 'Is body type important to you? Select all that apply.',
        answers: [
          { answer: "I don't mind", name: 'dontMind' },
          { answer: 'Heavy set', name: 'heavySet', evaluation: { 'self_improvement.sexuality_problems': 1 } },
          { answer: 'Athletic', name: 'athletic' },
          { answer: 'Slim', name: 'slim' },
          { answer: 'Skinny', name: 'skinny', evaluation: { 'self_improvement.sexuality_problems': 2 } },
          { answer: 'A few extra kilos', name: 'fewExtraKilos' },
          { answer: 'Overweight', name: 'overweight', evaluation: { 'self_improvement.sexuality_problems': 3 } },
        ],
        name: 'mateBodyType', //mate_build
        type: QuestionsType.MULTIPLE,
        midStepTexts: ["Did you know?A study by Dr. Gail Matthews at Dominican University found that people who write down their goals are 42% more likely to achieve them than those who don't."]
      },
      {
        step: 7,
        question: 'What type of mate are you looking for? Select all that apply.',
        answers: [
          {
            answer: 'Independent',
            name: 'independent',
            evaluation: { 'self_improvement.commitment_issues': -2, 'other.living_with_parents': 3 },
          },
          {
            answer: 'Sociable',
            name: 'sociable',
            evaluation: { 'awareness_objectives.picky': 1, 'self_improvement.communication_problems': -2 },
          },
          { answer: 'Ambitious', name: 'ambitious' },
          {
            answer: 'Reserved',
            name: 'reserved',
            evaluation: {
              'awareness_objectives.picky': 1,
              'self_improvement.communication_problems': 2,
              'self_improvement.sexuality_problems': 2,
            },
          },
          { answer: 'Adventurous', name: 'adventurous' },
          {
            answer: 'Shy',
            name: 'shy',
            evaluation: {
              'awareness_objectives.picky': 1,
              'self_improvement.communication_problems': 1,
              'self_improvement.sexuality_problems': 2,
            },
          },
          { answer: 'Passionate', name: 'passionate' },
          { answer: 'Practical', name: 'practical' },
          {
            answer: 'Thoughtful',
            name: 'thoughtful',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5 },
          },
          { answer: 'Organized', name: 'organized', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 } },
          { answer: 'Helpful', name: 'helpful', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 } },
          {
            answer: 'Charitable',
            name: 'charitable',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3 },
          },
          {
            answer: 'Trustworthy',
            name: 'trustworthy',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5 },
          },
          {
            answer: 'Environmentally aware',
            name: 'environmentallyAware',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1, 'awareness_objectives.picky': 1 },
          },
          {
            answer: 'Romantic',
            name: 'romantic',
            evaluation: {
              'awareness_objectives.picky': 1,
              'self_improvement.sexuality_problems': 2,
              'self_improvement.loneliness_stress_motivation': 2,
            },
          },
          {
            answer: 'Sexual chemistry',
            name: 'sexualChemistry',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 2,
              'self_improvement.sexuality_problems': 3,
            },
          }, //sexual_chemistry
          {
            answer: 'Common interests',
            name: 'commonInterests',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3 },
          }, //common_interests
          { answer: 'Loyal', name: 'loyal', evaluation: { 'self_improvement.sexuality_problems': 2 } },
          {
            answer: 'Dynamic',
            name: 'dynamic',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 2, 'awareness_objectives.picky': 4 },
          },
          {
            answer: 'Prudent',
            name: 'prudent',
            'self_improvement.communication_problems': 2,
            evaluation: { 'self_improvement.sexuality_problems': 3 },
          },
          {
            answer: 'Sensitive',
            name: 'sensitive',
            evaluation: { 'awareness_objectives.picky': 1, 'self_improvement.communication_problems': 2 },
          },
          { answer: 'Humorous', name: 'humorous', evaluation: { 'self_improvement.communication_problems': -3 } },
          { answer: 'Spiritual', name: 'spiritual' },
          {
            answer: 'Religious (active)',
            name: 'religiousActive',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 4,
              'awareness_objectives.picky': 4,
              'self_improvement.commitment_issues': 5,
              'self_improvement.sexuality_problems': 4,
            },
          },
          {
            answer: 'Well read/Intellectual',
            name: 'wellReadIntellectual',
            evaluation: { 'self_improvement.communication_problems': 1 },
          },
          { answer: 'College/University graduate', name: 'collegeGraduate' },
          { answer: 'Smart', name: 'smart' },
          {
            answer: 'Financially successful',
            name: 'financiallySuccessful',
            evaluation: { 'awareness_objectives.picky': 3 },
          },
          {
            answer: 'Interested to start a family',
            name: 'startFamily',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 4,
              'awareness_objectives.picky': 1,
              'other.fertility_issues': 5,
            },
          }, //family_oriented
          {
            answer: 'Not married before',
            name: 'notMarriedBefore',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 4, 'awareness_objectives.picky': 4 },
          },
          {
            answer: 'No children from previous relationships',
            name: 'noChildrenFromPreviousRelationships',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3, 'awareness_objectives.picky': 3 },
          },
          {
            answer: 'Cleanliness/tidiness to be high on their list',
            name: 'cleanlinessHigh',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3, 'awareness_objectives.picky': 2 },
          },
          {
            answer: 'Pet lover',
            name: 'petLover',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1, 'awareness_objectives.picky': 3 },
          },
          { answer: 'No animals', name: 'noAnimals', evaluation: { 'awareness_objectives.picky': 3 } },
          {
            answer: 'Vegetarian / Vegan',
            name: 'vegetarianVegan',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 2, 'awareness_objectives.picky': 2 },
          },
          { answer: 'Non smoker', name: 'nonSmoker' },
          {
            answer: 'Non drinker',
            name: 'nonDrinker',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1 },
          },
          {
            answer: 'Casual drinker',
            name: 'casualDrinker',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1 },
          },
          {
            answer: 'Regular drinker',
            name: 'regularDrinker',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 4 },
          },
          {
            answer: 'Body piercings',
            name: 'bodyPiercings',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 4 },
          },
          { answer: 'Tall', name: 'tall', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 } },
          { answer: 'Short', name: 'short', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 } },
          { answer: 'Sexy', name: 'sexy', evaluation: { 'awareness_objectives.wrong_choice_partner': 10 } },
          {
            answer: 'Has tattoos',
            name: 'hasTattoos',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 3 },
          },
          { answer: 'Local person', name: 'localPerson', evaluation: { 'awareness_objectives.picky': 2 } },
          {
            answer: 'Foreigner',
            name: 'foreigner',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 4, 'awareness_objectives.picky': 2 },
          },
          {
            answer: 'Of close vicinity',
            name: 'closeVicinity',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 2, 'awareness_objectives.picky': 2 },
          },
          { answer: 'Want children', name: 'wantChildren' },
          {
            answer: 'Bald',
            name: 'bald',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 4 },
          },
          {
            answer: 'Not Bald',
            name: 'notBald',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3, 'awareness_objectives.picky': 2 },
          },
          {
            answer: 'Facial hair',
            name: 'facialHair',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3 },
          },
          { answer: 'Hair color', name: 'hairColor', evaluation: { 'awareness_objectives.wrong_choice_partner': 3 } },
        ],
        name: 'mateType',
        type: QuestionsType.MULTIPLE,
      },
      {
        step: 7,
        question: 'What is the preferred star sign of your mate?',
        answers: [
          { answer: "I don't mind", name: 'dontMind' },
          { answer: 'Aries', name: 'aries' },
          { answer: 'Taurus', name: 'taurus' },
          { answer: 'Gemini', name: 'gemini' },
          { answer: 'Cancer', name: 'cancer' },
          { answer: 'Leo', name: 'leo' },
          { answer: 'Virgo', name: 'virgo' },
          { answer: 'Libra', name: 'libra' },
          { answer: 'Scorpio', name: 'scorpio' },
          { answer: 'Sagittarius', name: 'sagittarius' },
          { answer: 'Capricorn', name: 'capricorn' },
          { answer: 'Aquarius', name: 'aquarius' },
          { answer: 'Pisces', name: 'pisces' },
        ],
        name: 'starSign',
        type: QuestionsType.SINGLE,
      },
    ];

    for (const [index, question] of questions.entries()) {
      await prisma.question.upsert({
        where: { question: question.question },
        create: {
          step: question.step,
          question: question.question,
          name: question.name,
          type: question.type,
          midStepText: question.midStepTexts.join('\n'),
          answers: {
            create: question.answers.map((answer) => ({
              answer: answer.answer,
              name: answer.name,
              evaluation: answer.evaluation,
            })),
          },
        },
        update: {
          step: question.step,
          question: question.question,
          name: question.name,
          type: question.type,
          midStepText: question.midStepTexts.join('\n'),
        },
      });
    }
  }
}
