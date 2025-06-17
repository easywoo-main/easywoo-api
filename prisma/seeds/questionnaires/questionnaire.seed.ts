import { PrismaClient, QuestionsType } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';

export class QuestionnaireSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const questions = [
      {
        step: 1,
        question: 'Gender',
        answers: [
          { answer: 'Male', name: 'male', easywooName: 'male' },
          { answer: 'Female', name: 'female', easywooName: 'female' },
          { answer: 'Non-binary', name: 'nonBinary', easywooName: 'non_binary' },
        ],
        name: 'gender',
        easywooName: 'gender',
        type: QuestionsType.SINGLE
      },
      {
        step: 1,
        question: 'Sexual Orientation',
        answers: [
          { answer: 'Straight', name: 'straight', easywooName: 'straight',  },
          { answer: 'Gay', name: 'gay',easywooName:"gay", evaluation: { 'other.living_with_parents': 3 } },
          { answer: 'Bisexual', name: 'bisexual',easywooName: "bi_sexual", evaluation: { 'other.living_with_parents': 3 } },
          // { answer: 'Non binary', name: 'nonBinary', evaluation: { 'other.living_with_parents': 3 } },
          { answer: 'Other', name: 'other', easywooName: "pansexual" } //
        ],
        name: 'sexualOrientation',
        easywooName: "sexual_orientation",
        type: QuestionsType.SINGLE
      },
      // {
      //   step: 1,
      //   question: 'Ethnicity',
      //   answers: [
      //     { answer: 'White', name: 'white' },
      //     { answer: 'Black', name: 'black' },
      //     { answer: 'Asian', name: 'asian' },
      //     { answer: 'Mixed', name: 'mixed' },
      //     { answer: 'Other', name: 'other' }
      //   ],
      //   name: 'ethnicity',
      //   type: QuestionsType.SINGLE
      // },
      // {
      //   step: 1,
      //   question: 'Your body type',
      //   answers: [
      //     { answer: 'I don\'t mind', name: 'dontMind' },
      //     { answer: 'Heavy set', name: 'heavySet' },
      //     { answer: 'Athletic', name: 'athletic' },
      //     { answer: 'Slim', name: 'slim' },
      //     { answer: 'Skinny', name: 'skinny' },
      //     { answer: 'A few extra kilos', name: 'fewExtraKilos' },
      //     { answer: 'Overweight', name: 'overweight' }
      //   ],
      //   name: 'bodyType',
      //   type: QuestionsType.MULTIPLE
      // },
      {
        step: 1,
        question: 'What is your age?',
        answers: [
          { answer: '18-20', name: '18-20', easywooName: "1" },
          { answer: '21-25', name: '21-25', easywooName: "2" },
          { answer: '26-30', name: '26-30', easywooName: "3" },
          { answer: '31-35', name: '31-35', easywooName: "4" },
          { answer: '36-40', name: '36-40', easywooName: "5" },
          { answer: '41-45', name: '41-45', easywooName: "6" },
          { answer: '46-50', name: '46-50', easywooName: "7" },
          { answer: '51-60', name: '51-60', easywooName: "8" },
          { answer: '60+', name: '60+', easywooName: "9" }
        ],
        name: 'age',
        easywooName: "age",
        type: QuestionsType.SINGLE
      },
      // {
      //   step: 1,
      //   question: 'What is your current relationship status?',
      //   answers: [
      //     { answer: 'Single', name: 'single' },
      //     { answer: 'Commited relationship/Married', name: 'commitedRelationship' },
      //     { answer: 'It\'s complicated', name: 'itsComplicated' },
      //     { answer: 'Separated / Divorced / Widower', name: 'divorced' }
      //   ],
      //   name: 'relationshipStatus',
      //   type: QuestionsType.SINGLE
      // },
      // {
      //   step: 1,
      //   question: 'Do you have children',
      //   answers: [
      //     { answer: 'Yes', name: 'yes' },
      //     { answer: 'No', name: 'no' }
      //   ],
      //   name: 'children',
      //   type: QuestionsType.SINGLE,
      //   midStepTexts: ['Hey! Welcome to easywooYour Personal Empowerment Companion for:- Fixing your current relationship struggles- Transforming your dating game- Finding a relationship that truly fits you- Boosting your confidence- Improving your communication skillsOur users experience an 80% improvement rate with our personalized coaching content.']
      // },
      // {
      //   step: 2,
      //   question: "Your star sign",
      //   answers: [
      //     {answer: 'Prefer not to say', name: 'preferNotToSay' },
      //     {answer: 'Aries', name: 'aries' },
      //     {answer: "Taurus", name: 'taurus' },
      //     {answer: "Gemini", name: 'gemini' },
      //     {answer: "Cancer", name: 'cancer' },
      //     {answer: "Leo", name: 'leo' },
      //     {answer: "Virgo", name: 'virgos' },
      //     {answer: "Libra", name: "libra"},
      //     {answer: "Scorpio", name: 'scorpio' },
      //     {answer: "Sagittarius", name: 'sagittarius' },
      //     {answer: "Capricorn", name: 'capricorn' },
      //     {answer: "Aquarius", name: "aquarius"},
      //     {answer: "Pisces", name: 'pisces' },
      //   ],
      //   name: "personStarSign",
      //   type: QuestionsType.SINGLE,
      // },
      // {
      //   step:2,
      //   question: "Education",
      //   answers: [
      //     {answer: "High school", name: "highSchool"},
      //     {answer: "Graduate", name: "graduate"},
      //     {answer: "Post Graduate", name: "postGraduate"},
      //   ],
      //   name: "education",
      //   type: QuestionsType.SINGLE,
      // },
      // {
      //   step:2,
      //   question: "Financial status",
      //   answers: [
      //     {answer: "Not making it", name: "notMakingIt"},
      //     {answer: "Just making it", name: "justMakingIt"},
      //     {answer: "Comfortable", name: "comfortable"},
      //     {answer: "Well off", name: "wellOff"},
      //     {answer: "Very well off", name: "veryWellOff"},
      //   ],
      //   name: "financialStatus",
      //   type: QuestionsType.SLIDER,
      // },
      {
        step: 2,
        question: 'How active are you on Social Media? Select only one',
        answers: [
          {
            answer: 'Not active',
            name: 'notActive',
            evaluation: { 'opportunity.wrong_use_SM': 15, 'opportunity.mate_hungs_out': 5 },
            easywooName: "1"
          }, //not_active
          {
            answer: 'Somewhat active',
            name: 'somewhatActive',
            evaluation: { 'opportunity.wrong_use_SM': 10, 'opportunity.mate_hungs_out': 3 },
            easywooName: "2"
          }, // somewhat_active
          { answer: 'Active', name: 'active', evaluation: { 'opportunity.wrong_use_SM': 10 },
            easywooName: "3" },
          { answer: 'Very active', name: 'veryActive', evaluation: { 'opportunity.wrong_use_SM': 15 },
            easywooName: "4" },
          { answer: 'Hooked', name: 'hooked',
            easywooName: "5" }
        ],
        name: 'socialActivity',
        easywooName: "sm_active",
        type: QuestionsType.SLIDER
      },
      {
        step: 2,
        question: 'How confident are you in social media? Select only only',
        answers: [
          { answer: 'Not at all', name: 'notAtAll',         easywooName: '1'},
          {
            answer: 'Just trying',
            name: 'justTrying',
            evaluation: { 'opportunity.wrong_use_SM': 5, 'opportunity.mate_hungs_out': 3 },
            easywooName: '2'
          },
          { answer: 'I am okay with it', name: 'okayWithIt', evaluation: { 'opportunity.wrong_use_SM': 3 }, easywooName: '3' },
          { answer: 'Confident', name: 'confident', evaluation: { 'opportunity.wrong_use_SM': 5 }, easywooName: '4' },
          { answer: 'Very confident', name: 'veryConfident', easywooName: '5' },
          {
            answer: 'Not familiar',
            name: 'notFamiliar',
            easywooName: '6',
            evaluation: {
              'opportunity.mate_hungs_out': 3,
              'awareness_objectives.scared_move_relationship': 15,
              'opportunity.wrong_use_SM': 15
            }
          } //not_familiar
        ],
        easywooName: "sm_confidence",
        name: 'confidenceInSocialMedia',
        type: QuestionsType.SLIDER
      },
      {
        step: 3,
        question: 'Where do you mostly socialize? Select all that apply',
        answers: [
          { answer: 'At a restaurant', name: 'restaurant',easywooName: "restaurant" },
          { answer: 'At a club', name: 'club', easywooName: "club" },
          { answer: 'At the gym', name: 'gym', easywooName: "gym" },
          { answer: 'At a bar', name: 'bar', easywooName: "bar" },
          { answer: 'Sports / activities', name: 'activities', easywooName: "sports_activities" },
          { answer: 'Cafés', name: 'cafes', easywooName: "cafe" },
          {
            answer: 'At home with friends',
            name: 'home',
            evaluation: { 'self_improvement.loneliness_stress_motivation': 3 },
            easywooName: "home_friends"
          },
          {
            answer: 'Nowhere',
            name: 'nowhere',
            evaluation: { 'opportunity.wrong_use_SM': 15, 'self_improvement.loneliness_stress_motivation': 15 },
            easywooName: "nowhere",
          },
          {
            answer: 'Social media',
            name: 'socialMedia',
            evaluation: {
              'opportunity.wrong_use_SM': -15,
              'opportunity.mate_hungs_out': 3,
              'self_improvement.loneliness_stress_motivation': 3
            },
            easywooName: "social_media",
          }, //social_media
          { answer: 'Work', name: 'work', easywooName: "work" },
          { answer: 'College', name: 'college', easywooName: "college" },
        ],
        name: 'socialize', // social_at
        easywooName: "social_at[]",
        type: QuestionsType.MULTIPLE
      },
      {
        step: 3,
        question: 'What kind of relationship are you looking for? Select all that apply.',
        answers: [
          { answer: 'Casual no expectation', name: 'casual', evaluation: { 'other.just_date': 5 }, easywooName: 'casual'  },
          { answer: 'Serious relationship', name: 'serious', easywooName: 'relationship_commitment'  },
          { answer: 'Casual sex', name: 'sexual', evaluation: { 'other.just_date': 10 },  easywooName: 'casual_sex' },
          { answer: 'Friendship', name: 'friendship', evaluation: { 'other.looking_friends': 15 }, easywooName: 'friendship' },
          { answer: 'Committed relationship', name: 'committed', easywooName: 'commited_relationship'  },
          { answer: 'Situationship', name: 'situationship', evaluation: { 'other.just_date': 5 }, easywooName: "situationship" },
          { answer: 'In a relationship but want to meet other people', name: 'inARelationship', easywooName: "seeing_other_people" }
        ],
        name: 'mateRelationship', // relationship
        easywooName: "relationship[]",
        type: QuestionsType.MULTIPLE,
        midStepTexts: ['This might matter to you...63.8% of the world\'s population uses social media. Choosing to avoid social media might lead to feelings of isolation, especially if friends and family connect online. It\'s natural to feel left out of the loop—your connections matter!',
          'Confident social media use is wonderful!Just remember, moderation is key to staying balanced and healthy.Average daily social media use: 2 hours 21 minutes.- This is considered excessive for mental health.- Risks include feelings of inadequacy, anxiety, stress, social isolation and FOMO',
          'Turns out, your screen time might actually be helping!People who dive into online support groups or communities often feel less stressed and anxious. The best part? The anonymity and 24/7 access make it super easy to reach out when you need a boost.']
      },
      {
        step: 4,
        question: 'Let\'s see what type of person you are. Select all that apply.',
        answers: [
          {
            answer: 'Independent',
            name: 'independent',
            evaluation: {
              'opportunity.mate_hungs_out': -2,
              'self_improvement.commitment_issues': 4,
              'other.living_with_parents': -5
            },
            easywooName: 'independent',
          },
          { answer: 'Sociable', name: 'sociable', evaluation: { 'opportunity.mate_hungs_out': -3 }, easywooName: 'sociable' },
          { answer: 'Loyal', name: 'loyal', easywooName: 'loyal' },
          { answer: 'Charitable', name: 'charitable', easywooName: 'charitable' },
          { answer: 'Trustworthy', name: 'trustworthy',easywooName: 'trustworthy' },
          // { answer: 'Environmentally aware', name: 'environmentallyAware' },
          { answer: 'Ambitious', name: 'ambitious', evaluation: { 'self_improvement.commitment_issues': 4 }, easywooName: "ambitious" },
          {
            answer: 'Reserved',
            name: 'reserved',
            evaluation: { 'awareness_objectives.picky': 3, 'opportunity.mate_hungs_out': 2 },
            easywooName: "reserved"
          }, // reserved
          {
            answer: 'Adventurous',
            name: 'adventurous',
            evaluation: { 'opportunity.mate_hungs_out': -2, 'self_improvement.commitment_issues': 3 },
            easywooName: "adventurous",
          },
          {
            answer: 'Shy',
            name: 'shy',
            evaluation: {
              'opportunity.mate_hungs_out': 3,
              'self_improvement.sexuality_problems': 2,
              'self_improvement.loneliness_stress_motivation': 2
            },
            easywooName: "shy"
          },
          { answer: 'Passionate', name: 'passionate',
          easywooName: 'passionate'},
          { answer: 'Possessive', name: 'possessive', easywooName: "possesive" },
          { answer: 'Practical', name: 'practical',easywooName: 'practical' },
          {
            answer: 'Romantic',
            name: 'romantic',
            easywooName: 'romantic',
            evaluation: {
              'opportunity.mate_hungs_out': 2,
              'self_improvement.commitment_issues': 3,
              'self_improvement.sexuality_problems': 2,
              'self_improvement.loneliness_stress_motivation': 2
            }
          },
          { answer: 'Dynamic', name: 'dynamic', easywooName: "dynamic" },
          {
            answer: 'Sexual / Erotic',
            name: 'sexualErotic',
            evaluation: {
              'self_improvement.commitment_issues': 5,
              'self_improvement.sexuality_problems': 2,
              'other.living_with_parents': 5
            },
            easywooName: "sexual_erotic"
          }, //sexual_erotic
          {
            answer: 'Prudent',
            name: 'prudent',
            evaluation: { 'opportunity.mate_hungs_out': 3, 'self_improvement.sexuality_problems': 3 },
            easywooName: 'prudent',
          },
          {
            answer: 'Sensitive',
            name: 'sensitive',
            evaluation: { 'opportunity.mate_hungs_out': 1, 'self_improvement.loneliness_stress_motivation': 2 },
            easywooName: "sensitive"
          },
          { answer: 'Humorous', name: 'humorous', easywooName: 'humorous' },
          { answer: 'Spiritual', name: 'spiritual', easywooName: 'spiritual' },
          {
            answer: 'Religious',
            name: 'religious',
            evaluation: {
              'opportunity.mate_hungs_out': 2,
              'self_improvement.commitment_issues': 5,
              'self_improvement.sexuality_problems': 4
            },
            easywooName: "religious",
          },
          {
            answer: 'Well Read / Intellectual',
            name: 'wellReadIntellectual',
            evaluation: { 'opportunity.mate_hungs_out': 2 },
            easywooName: "read_intellectual"
          },
          {
            answer: 'Successful',
            name: 'successful',
            evaluation: {
              'opportunity.mate_hungs_out': -1,
              'self_improvement.commitment_issues': 4,
              'self_improvement.loneliness_stress_motivation': 3,
              'other.financial_instability': -15
            },
            easywooName: "financially_successful"
          }, //financially_successful
          {
            answer: 'Likes tidiness',
            name: 'likesTidiness',
            evaluation: {
              'opportunity.mate_hungs_out': 4,
              'self_improvement.sexuality_problems': 3,
              'self_improvement.loneliness_stress_motivation': 2
            },
            easywooName: "tidiness_cleanliness"
          }, //tidiness_cleanliness
          // { answer: 'Pet lover', name: 'petLover' },
          // { answer: 'Vegetarian / Vegan', name: 'vegetarianVegan' },
          { answer: 'Smoker', name: 'smoker',easywooName: 'smoker' },
          { answer: 'Non drinker', name: 'nonDrinker', evaluation: { 'opportunity.mate_hungs_out': 2 }, easywooName: "non_drinker" },
          { answer: 'Casual drinker', name: 'casualDrinker', easywooName: "casual_drinker" },
          {
            answer: 'Regular drinker',
            name: 'regularDrinker',
            evaluation: {
              'self_improvement.sexuality_problems': 5,
              'self_improvement.loneliness_stress_motivation': 1
            },
            easywooName: "regular_drinker"
          },
          // { answer: 'Bald', name: 'bald' },
          // { answer: 'Facial hair', name: 'facialHair' },
          // { answer: 'Want children', name: 'wantChildren' },
          // { answer: 'Body piercings', name: 'bodyPiercings' },
          // { answer: 'Have tattoos', name: 'haveTattoos' }
        ],
        name: 'personType', //persona
        easywooName: "persona[]",
        type: QuestionsType.MULTIPLE
      },
      {
        step: 5,
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
              'self_improvement.loneliness_stress_motivation': 3
            },
            easywooName: "Confidence_issues"
          }, //Confidence_issues
          {
            answer: 'Communication problems',
            name: 'communicationProblems',
            evaluation: {
              'self_improvement.communication_problems': 5
            },
            easywooName: "communication_problems"
          }, //communication_problems
          {
            answer: 'I feel I am too old to date',
            name: 'tooOldToDate',
            evaluation: {
              'awareness_objectives.age': 15,
              'self_improvement.commitment_issues': 3,
              'self_improvement.loneliness_stress_motivation': 2,
              'other.fertility_issues': 15
            },
            easywooName: "feel_old"
          }, //getting_old
          { answer: 'Running out of time to start family', name: 'runningOutOfTime', easywooName: 'getting_old' },
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
              'self_improvement.sexuality_problems': 3
            },
            easywooName: "appearance_happiness"
          }, //appearance_happiness
          {
            answer: 'Not happy with my social life',
            name: 'notHappyWithSocialLife',
            evaluation: {
              'awareness_objectives.new_location': 5,
              'opportunity.sexuality_lgbt': 5,
              'self_improvement.communication_problems': 3,
              'self_improvement.loneliness_stress_motivation': 5
            },
            easywooName: "not_happy_with_social_life",

          }, // not_happy_with_social_life
          {
            answer: 'Too busy to date',
            name: 'busyToDate',
            evaluation: {
              'opportunity.no_social_life': 3,
              'opportunity.mate_hungs_out': 4,
              'self_improvement.commitment_issues': 2,
              'self_improvement.time_management': 15
            },
            easywooName: "busy_to_date"
          }, // busy_to_date
          {
            answer: 'Don’t know where to find dates / friends',
            name: 'dontKnowWhereToFindDates',
            evaluation: { 'opportunity.mate_hungs_out': 15 },
            easywooName: "where_to_date"
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
              'self_improvement.loneliness_stress_motivation': 5
            },
            easywooName: "no_single_friends",
          }, //no_single_friends
          { answer: 'I want to get out of current relationship', name: 'wantToGetOutOfCurrentRelationship', easywooName: 'scared_to_breakup' },
          { answer: 'Burned in relationships', name: 'burnedInRelationships', easywooName: "relfr_burned" },
          {
            answer: 'Stuck on my ex',
            name: 'stuckOnMyEx',
            evaluation: {
              'opportunity.no_social_life': 3,
              'self_improvement.get_over_ex': 15,
              'self_improvement.commitment_issues': -3
            },
            easywooName: "stuck_ex"
          }, // stuck_ex
          {
            answer: 'I want to increase my dating chances',
            name: 'increaseDatingChances',
            evaluation: { 'other.just_date': 15 },
            easywooName: "increase_dating_chances"
          }, //increase_dating_chances
          {
            answer: 'My online dates don’t get a follow up',
            name: 'noFollowUpOnlineDates',
            evaluation: { 'awareness_objectives.no_follow': 15 },
            easywooName: "online_dates_follow"
          },
          {
            answer: 'I often end up in the friend zone',
            name: 'endUpInFriendZone',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 15,
              'opportunity.sexuality_lgbt': 4,
              'opportunity.no_social_life': 2,
              'self_improvement.commitment_issues': 1,
              'self_improvement.sexuality_problems': 5
            },
            easywooName: "friendzoned"
          }, // friendzoned
          { answer: 'People I like don’t want to date me', name: 'peopleDontWantToDateMe', easywooName: 'getting_rejected' },
          {
            answer: 'Still living with parents',
            name: 'stillLivingWithParents',
            evaluation: { 'other.living_with_parents': 15 },
            easywooName: "living_with_parents",
          }, //living_with_parents
          {
            answer: 'Financial instability',
            name: 'financialInstability',
            evaluation: {
              'opportunity.mate_hungs_out': 1,
              'self_improvement.communication_problems': 1,
              'self_improvement.loneliness_stress_motivation': 2,
              'other.financial_instability': 15
            },
            easywooName: "Financial_instability"
          }, //Financial_instability
          // {
          //   answer: 'Getting Rejected',
          //   name: 'gettingRejected',
          //   evaluation: {
          //     'opportunity.sexuality_lgbt': 5,
          //     'opportunity.no_social_life': 2,
          //     'self_improvement.communication_problems': 2,
          //     'self_improvement.sexuality_problems': 3,
          //     'self_improvement.loneliness_stress_motivation': 3
          //   }
          // }, //getting_rejected
          // {
          //   answer: 'Scared to breakup',
          //   name: 'scaredToBreakup',
          //   evaluation: {
          //     'opportunity.sexuality_lgbt': 4,
          //     'opportunity.no_social_life': 3,
          //     'opportunity.mate_hungs_out': 3,
          //     'self_improvement.communication_problems': 2,
          //     'self_improvement.loneliness_stress_motivation': 3
          //   }
          // }, //scared_to_breakup
          {
            answer: 'Pressure from family / society to start a family',
            name: 'pressureToStartFamily',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 3,
              'awareness_objectives.scared_move_relationship': 3,
              'self_improvement.sexuality_problems': 3
            }, //family_pressure
            easywooName: "family_pressure"
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
              'self_improvement.weight_issues': 15
            },
            easywooName: "Weight_issues"
          }, //Weight_issues
          {
            answer: 'I am away from what I call home',
            name: 'awayFromHome',
            evaluation: {
              'opportunity.new_location': 15,
              'opportunity.no_social_life': 5,
              'opportunity.mate_hungs_out': 5,
              'other.living_with_parents': -15
            },
            easywooName: "far_from_home"
          } //far_from_home
        ],
        name: 'biggestChallenges', // pain_points
        easywooName: "pain_points[]",
        type: QuestionsType.MULTIPLE,
        midStepTexts: ['This could uplift you! You embody an adventurous spirit paired with ambition, seeking new experiences while striving for your goals. It\'s an inspiring journey!',
          ' This might resonate. You are a compassionate, trustworthy person whose sensitivity allows you to connect deeply with others and make a meaningful impact.',
          ' This could uplift you! You are a unique blend of independence and passion, with a romantic heart that shines through your gentle, shy demeanor.',
          'This could inspire you... You are a tender-hearted individual, shy yet romantic, cherishing deep connections and beautiful moments while navigating your sensitive emotions.', ' You will appreciate this. You are an inspiring individual, driven by ambition and passion, embracing adventure while dynamically pursuing your dreams with enthusiasm and courage.', ' This might matter to you... Being a Highly Sensitive Person (HSP) is challenging yet beautiful; your depth fosters profound connections, making your emotional journey uniquely enriching.', ': Embracing your unique traits unlocks your potential, leading to a happier, more authentic life. You truly deserve this journey of self-discovery!']
      },
      {
        step: 6,
        question: 'We are here to help you achieve your goals. Select all that apply.',
        answers: [
          { answer: 'Find relationship I match with', name: 'findRelationship', easywooName: "find_relationship_match" },
          {
            answer: 'Learn how to attract the people I like',
            name: 'learnAttractPeople',
            evaluation: { 'opportunity.wrong_use_SM': 15, 'opportunity.mate_hungs_out': 15 },
            easywooName: "Learn_people_date",
          }, // Learn_people_date
          {
            answer: 'Improve social life',
            name: 'improveSocialLife',
            evaluation: { 'opportunity.no_social_life': 10 },
            easywooName: "social_life"
          }, //social_life
          // { answer: 'Find new friends', name: 'findNewFriends', easuwooName: "Find_new_friends" },
          { answer: 'Start a family', name: 'startFamily', evaluation: { 'other.fertility_issues': 5 }, easywooName: "start_family" }, //start_family
          { answer: 'Self development', name: 'selfDevelopment', easywooName: "self_development" },
          {
            answer: 'Improve self awareness',
            name: 'improveSelfAwareness',
            evaluation: { 'self_improvement.communication_problems': 5, 'self_improvement.commitment_issues': 5 },
            easywooName: "improve_self_confidence"
          }, //improve_self_awareness
          {
            answer: 'Improve self confidence',
            name: 'improveSelfConfidence',
            evaluation: {
              'self_improvement.communication_problems': 5,
              'self_improvement.loneliness_stress_motivation': 5
            },
            easywooName: "improve_self_confidence"
          }, //improve_self_confidence
          { answer: 'Improve a certain part of my physical appearance', name: 'improvePhysicalAppearance', easywooName: "improve_certain_physical_appearance" },
          // {
          //   answer: 'Confidence move out relationship',
          //   name: 'confidenceMoveOutRelationship',
          //   evaluation: { 'self_improvement.get_over_ex': 5 }
          // }, // confidence_move_out_relationship
          {
            answer: 'Improve body weight',
            name: 'improveBodyWeight',
            evaluation: { 'self_improvement.weight_issues': 15 },
            easywooName: "improve_body_weight"
          },
          {
            answer: 'Improve sexual life',
            name: 'improveSexualLife',
            evaluation: { 'self_improvement.sexuality_problems': 15 },
            easywooName: "improve_sexual_life"
          }, //improve_sexual_life
          { answer: 'Further career', name: 'furtherCareer', evaluation: { 'other.further_career': 15 }, easywooName: "further_career" }, // further_career
          // { answer: 'Further education', name: 'furtherEducation' },
          { answer: 'Fix my finances', name: 'fixFinances', evaluation: { 'other.financial_instability': 15 }, easywooName: "fix_finances" }, //fix_finances
          {
            answer: 'Move out of parents\' house',
            name: 'moveOutParentsHouse',
            evaluation: { 'other.living_with_parents': 15 },
            easywooName: "Move_out_parents"
          },
          {
            answer: 'I want to move out of my relationship',
            name: 'moveOutRelationship',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5 },
            easywooName: "confidence_move_out_relationship"
          }, //find_relationship_match
          { answer: 'Get over my ex', name: 'getOverEx', evaluation: { 'opportunity.sexuality_lgbt': 4 },easywooName: "Get_over_ex" },
          { answer: 'Get out of the friend zone', name: 'getOutFriendZone', easywooName: "leave_friendzone" },
        ],
        name: 'goals', //motivation_goals
        easywooName: "motivation_goals[]",
        type: QuestionsType.MULTIPLE
      },
      {
        step: 6,
        question: 'Do you have a time frame to reach your goals?',
        answers: [
          { answer: 'Yes, within a month', name: 'month', easywooName: "1" },
          { answer: 'Yes, within six months', name: 'sixMonth', easywooName: "2" },
          { answer: 'Yes, within the year', name: 'year', easywooName: "3" },
          { answer: 'Yes, but no firm timeframe', name: 'noFirmTimeframe', easywooName: "4" },
          { answer: 'No', name: 'no', evaluation: { 'awareness_objectives.wrong_choice_partner': 5 }, easywooName: "5" },
        ],
        name: 'timeFrame',
        easywooName: "have_plan_goals",
        type: QuestionsType.SLIDER,
        midStepTexts: ['Feeling like a fraud?You\'re not alone—85% struggle with low self-esteem, and 82% face imposter syndrome. But you don\'t have to stay stuck there! easyWoo can elevate you to the confident 10%. :muscle::sparkles: ', 'You will want to know this!Unlock a whole new level of Communication skills. Our research-backed approach helps you build skills that will empower you to take any relationship with confidence.', 'Here is something worth knowing...89% of people think there\'s value in couples counsellingThe top barriers people face preventing them from going to couples counselling are:- The cost- Finding the right therapist - Convincing their partner- Time71% of people say they wish they were more adept at discussing big relationship topics or dealing with conflictIf any of the above resonate with you then you\'re a great fit for our accelerated program designed to speed up your relationship problems once and for all.', 'Here is a piece of wisdomEach step you take towards bettering yourself, is something to be proud of. Life can be tough, but it also has incredible opportunities ahead.']
      },
      {
        step: 7,
        question: 'How important is appearance to you?',
        answers: [
          { answer: 'Not important', name: 'notImportant', evaluation: {'awareness_objectives.picky': -3}, easywooName: "1"  },
          { answer: 'Somewhat important', name: 'somewhatImportant', easywooName: "2" },
          {
            answer: 'Important',
            name: 'important',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 4,
              'awareness_objectives.picky': 3,
              'self_improvement.appearance_issues': 1
            },
            easywooName: "3"
          },
          {
            answer: 'Very important',
            name: 'veryImportant',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 5,
              'awareness_objectives.picky': 4,
              'self_improvement.appearance_issues': 3
            },
           easywooName: "4"
          }
        ],
        name: 'appearance', //look_importance
        easywooName: "look_importance",
        type: QuestionsType.SLIDER
      },
      {
        step: 7,
        question: 'What age groups interest you?',
        answers: [
          { answer: '18-20', name: '18-20', easywooName: "18_20" },
          { answer: '21-25', name: '21-25', easywooName: "21_25" },
          { answer: '26-30', name: '26-30', easywooName: "26_30" },
          { answer: '31-35', name: '31-35', easywooName: "31-35" },
          { answer: '36-40', name: '36-40', easywooName: "36_40" },
          { answer: '41-45', name: '41-45', easywooName: "41_45" },
          { answer: '46-50', name: '46-50', easywooName: "46_50" },
          { answer: '51-60', name: '51-60', easywooName: "51_60" },
          { answer: '60+', name: '60+', easywooName: "60+" }
        ],
        name: 'mateAge',
        easywooName: "mate_age[]",
        type: QuestionsType.MULTIPLE
      },
      // {
      //   step: 7,
      //   question: 'Is ethnicity important to you? Select all that apply.',
      //   answers: [
      //     { answer: 'I don\'t mind', name: 'dontMind' },
      //     { answer: 'White', name: 'white' },
      //     { answer: 'Black', name: 'black' },
      //     { answer: 'Asian', name: 'asian' },
      //     { answer: 'Mixed', name: 'mixed' },
      //     { answer: 'Other', name: 'other' }
      //   ],
      //   name: 'mateEthnicity',
      //   type: QuestionsType.SINGLE
      // },
      {
        step: 7,
        question: 'Is body type important to you? Select all that apply.',
        answers: [
          { answer: 'I don\'t mind', name: 'dontMind', easywooName: "dont_mind" },
          { answer: 'Heavy set', name: 'heavySet', evaluation: { 'self_improvement.sexuality_problems': 1 }, easywooName: "heavy" },
          { answer: 'Athletic', name: 'athletic', easywooName: "athletic" },
          { answer: 'Slim', name: 'slim', easywooName: "slim" },
          { answer: 'Skinny', name: 'skinny', evaluation: { 'self_improvement.sexuality_problems': 2 }, easywooName: "skinny" },
          { answer: 'A few extra kilos', name: 'fewExtraKilos',easywooName: "extra_kilos" },
          { answer: 'Overweight', name: 'overweight', evaluation: { 'self_improvement.sexuality_problems': 3 }, easywooName: "overweight" },
        ],
        name: 'mateBodyType', //mate_build
        type: QuestionsType.MULTIPLE,
        easywooName: "mate_build[]",
        midStepTexts: ['Did you know?A study by Dr. Gail Matthews at Dominican University found that people who write down their goals are 42% more likely to achieve them than those who don\'t.']
      },
      {
        step: 8,
        question: 'Let\'s see what type of mate are you looking for',
        answers: [
          {
            answer: 'Independent',
            name: 'independent',
            evaluation: { 'self_improvement.commitment_issues': -2, 'other.living_with_parents': 3 },
            easywooName: "independent"
          },
          {
            answer: 'Sociable',
            name: 'sociable',
            evaluation: { 'awareness_objectives.picky': 1, 'self_improvement.communication_problems': -2 },
            easywooName: "sociable"
          },
          { answer: 'Ambitious', name: 'ambitious', easywooName: "ambitious" },
          {
            answer: 'Reserved',
            name: 'reserved',
            evaluation: {
              'awareness_objectives.picky': 1,
              'self_improvement.communication_problems': 2,
              'self_improvement.sexuality_problems': 2
            },
            easywooName: "ambitious"
          },
          { answer: 'Adventurous', name: 'adventurous', easywooName: "adventurous" },
          {
            answer: 'Shy',
            name: 'shy',
            evaluation: {
              'awareness_objectives.picky': 1,
              'self_improvement.communication_problems': 1,
              'self_improvement.sexuality_problems': 2
            },
            easywooName: "shy"
          },
          { answer: 'Passionate', name: 'passionate', easywooName: "passionate" },
          { answer: 'Practical', name: 'practical', easywooName: "practical" },
          {
            answer: 'Thoughtful',
            name: 'thoughtful',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5 },
            easywooName: "thoughtful"
          },
          { answer: 'Organized', name: 'organized', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 }, easywooName: "organized" },
          { answer: 'Helpful', name: 'helpful', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 }, easywooName: "helpful" },
          {
            answer: 'Charitable',
            name: 'charitable',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3 },
            easywooName: "charitable"
          },
          {
            answer: 'Trustworthy',
            name: 'trustworthy',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5 },
            easywooName: "trustworthy"
          },
          {
            answer: 'Environmentally aware',
            name: 'environmentallyAware',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1, 'awareness_objectives.picky': 1 },
            easywooName: "environmentally_aware"
          },
          {
            answer: 'Romantic',
            name: 'romantic',
            evaluation: {
              'awareness_objectives.picky': 1,
              'self_improvement.sexuality_problems': 2,
              'self_improvement.loneliness_stress_motivation': 2
            },
            easywooName: "romantic"
          },
          {
            answer: 'Sexual chemistry',
            name: 'sexualChemistry',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 2,
              'self_improvement.sexuality_problems': 3
            },
            easywooName: "sexual_chemistry"
          }, //sexual_chemistry
          {
            answer: 'Common interests',
            name: 'commonInterests',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3 },
            easywooName: "common_interests"
          }, //common_interests
          { answer: 'Loyal', name: 'loyal', evaluation: { 'self_improvement.sexuality_problems': 2 }, easywooName: "loyal" },
          {
            answer: 'Dynamic',
            name: 'dynamic',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 2, 'awareness_objectives.picky': 4 },
            easywooName: "dynamic"
          },
          {
            answer: 'Prudent',
            name: 'prudent',
            'self_improvement.communication_problems': 2,
            evaluation: { 'self_improvement.sexuality_problems': 3 },
            easywooName: "prudent",
          },
          {
            answer: 'Sensitive',
            name: 'sensitive',
            evaluation: { 'awareness_objectives.picky': 1, 'self_improvement.communication_problems': 2 },
            easywooName: "sensitive"
          },
          { answer: 'Humorous', name: 'humorous', evaluation: { 'self_improvement.communication_problems': -3 }, easywooName: "humorous" },
          { answer: 'Spiritual', name: 'spiritual', easywooName: "spiritual" },
          {
            answer: 'Religious (active)',
            name: 'religiousActive',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 4,
              'awareness_objectives.picky': 4,
              'self_improvement.commitment_issues': 5,
              'self_improvement.sexuality_problems': 4
            },
            easywooName: "religious"
          },
          {
            answer: 'Well read/Intellectual',
            name: 'wellReadIntellectual',
            evaluation: { 'self_improvement.communication_problems': 1 },
            easywooName: "read_intellectual"
          },
          { answer: 'College/University graduate', name: 'collegeGraduate', easywooName: "college_university" },
          { answer: 'Smart', name: 'smart',easywooName: "smart" },
          {
            answer: 'Financially successful',
            name: 'financiallySuccessful',
            evaluation: { 'awareness_objectives.picky': 3 },
            easywooName: "financially_successful"
          },
          {
            answer: 'Interested to start a family',
            name: 'startFamily',
            evaluation: {
              'awareness_objectives.wrong_choice_partner': 4,
              'awareness_objectives.picky': 1,
              'other.fertility_issues': 5
            },
            easywooName: "family_oriented"
          }, //family_oriented
          {
            answer: 'Not married before',
            name: 'notMarriedBefore',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 4, 'awareness_objectives.picky': 4 },
            easywooName: "not_married"
          },
          {
            answer: 'No children from previous relationships',
            name: 'noChildrenFromPreviousRelationships',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3, 'awareness_objectives.picky': 3 },
            easywooName: "no_children"
          },
          {
            answer: 'Cleanliness/tidiness to be high on their list',
            name: 'cleanlinessHigh',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3, 'awareness_objectives.picky': 2 },
            easywooName: "tidiness_cleanliness"
          },
          {
            answer: 'Pet lover',
            name: 'petLover',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1, 'awareness_objectives.picky': 3 },
            easywooName: "pet_lover"
          },
          { answer: 'No animals', name: 'noAnimals', evaluation: { 'awareness_objectives.picky': 3 }, easywooName: "mate_no_pet" },
          {
            answer: 'Vegetarian / Vegan',
            name: 'vegetarianVegan',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 2, 'awareness_objectives.picky': 2 },
            easywooName: "vegetarian_vegan"
          },
          // { answer: 'Non smoker', name: 'nonSmoker' },
          {
            answer: 'Non drinker',
            name: 'nonDrinker',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1 },
            easywooName: "non_smoker"
          },
          {
            answer: 'Casual drinker',
            name: 'casualDrinker',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 1 },
            easywooName: "non_drinker"
          },
          {
            answer: 'Regular drinker',
            name: 'regularDrinker',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 4 },
            easywooName: "casual_drinker"
          },
          {
            answer: 'Bald',
            name: 'bald',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 4 },
            easywooName: "bald"
          },
          {
            answer: 'Not Bald',
            name: 'notBald',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3, 'awareness_objectives.picky': 2 },
            easywooName: "not_bald"
          },
          {
            answer: 'Facial hair',
            name: 'facialHair',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 3 },
            easywooName: "facial_hair"
          },
          {
            answer: 'Body piercings',
            name: 'bodyPiercings',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 4 },
            easywooName: "body_piercings"
          },
          { answer: 'Tall', name: 'tall', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 }, easywooName: "tall" },
          { answer: 'Short', name: 'short', evaluation: { 'awareness_objectives.wrong_choice_partner': 2 }, easywooName: "short" },
          { answer: 'Sexy', name: 'sexy', evaluation: { 'awareness_objectives.wrong_choice_partner': 10 }, easywooName: "sexy" },
          {
            answer: 'Has tattoos',
            name: 'hasTattoos',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 5, 'awareness_objectives.picky': 3 },
            easywooName: "have_tattoos"
          },
          { answer: 'Local person', name: 'localPerson', evaluation: { 'awareness_objectives.picky': 2 }, easywooName: "local" },
          {
            answer: 'Foreigner',
            name: 'foreigner',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 4, 'awareness_objectives.picky': 2 },
            easywooName: "foreigner"
          },
          {
            answer: 'Of close vicinity',
            name: 'closeVicinity',
            evaluation: { 'awareness_objectives.wrong_choice_partner': 2, 'awareness_objectives.picky': 2 },
            easywooName: "close_vicinity"
          },
          { answer: 'Want children', name: 'wantChildren', easywooName: "want-children" },
          // { answer: 'Hair color', name: 'hairColor', evaluation: { 'awareness_objectives.wrong_choice_partner': 3 } }
        ],
        name: 'mateType',
        easywooName: "mate_persona[]",
        type: QuestionsType.MULTIPLE
      },
      {
        step: 9,
        question: 'What is the preferred star sign of your mate?',
        answers: [
          { answer: 'I don\'t mind', name: 'dontMind', easywooName: "dont_mind" },
          { answer: 'Aries', name: 'aries', easywooName: "Aries" },
          { answer: 'Taurus', name: 'taurus',easywooName: "Taurus" },
          { answer: 'Gemini', name: 'gemini', easywooName: "Gemini" },
          { answer: 'Cancer', name: 'cancer', easywooName: "Cancer" },
          { answer: 'Leo', name: 'leo', easywooName: "Leo" },
          { answer: 'Virgo', name: 'virgo', easywooName: "Virgo" },
          { answer: 'Libra', name: 'libra', easywooName: "Libra" },
          { answer: 'Scorpio', name: 'scorpio', easywooName: "Scorpio" },
          { answer: 'Sagittarius', name: 'sagittarius', easywooName: "Sagittarius" },
          { answer: 'Capricorn', name: 'capricorn', easywooName: "Capricorn" },
          { answer: 'Aquarius', name: 'aquarius', easywooName: "Aquarius" },
          { answer: 'Pisces', name: 'pisces', easywooName: "Pisces" },
        ],
        name: 'starSign',
        easywooName: "mate_sign[]",
        type: QuestionsType.MULTIPLE
      },
      {
        step: 10,
        question: 'Have tou come out as an LGBTQ+ individual? Select only one',
        answers: [
          { answer: 'Yes, To Family Only', name: 'family', easywooName: "family_only" },
          { answer: 'Yes, To Friends Only', name: 'friend', easywooName: "friends_only"},
          { answer: 'Yes, To Family and Friends', name: 'familyAndFriend', easywooName: "friends_family" },
          { answer: 'Yes, To Family Friends and Society', name: 'familyFriendAndSociety', easywooName: "friends_family_society" },
          { answer: 'No, But I Want To', name: 'NoWant', easywooName: "want_to" },
          { answer: 'No and I don\'t want To', name: 'no', easywooName: "dont_want_to" },
        ],
        name: '',
        easywooName: "come_out_gay_bi",
        type: QuestionsType.SINGLE
      },
      {
        step: 10,
        question: 'Do you fell accepted as a person of the LGBTQ+ community? Select only one',
        answers: [
          { answer: 'Yes', name: 'yes', easywooName:  "society"},
          { answer: 'No', name: 'no', easywooName: "no" },
        ],
        name: 'lgbtqAcceptance',
        easywooName: "accepted_lgbt",
        type: QuestionsType.SINGLE
      },
      {step: 10,
      question: "Do you accept your sexual orientation as a member of the LGBTQ+ community?",
        answers: [
          { answer: 'Yes', name: 'yes', easywooName: "accepted_sexuality_yes" },
          { answer: 'No', name: 'no', easywooName: "accepted_sexuality_no" },
          {answer: "In the process", name: "inProcess", easywooName: "accepted_sexuality_process" },
        ],
        name: 'lgbtqSelfAcceptance',
        easywooName: "accepted_your_sexuality",
        type: QuestionsType.SINGLE
      },
      {step: 10,
        question: "Do you fee pressure to conform to a straight relationship?",
        answers: [
          { answer: 'Yes', name: 'yes', easywooName: "yes" },
          { answer: 'No', name: 'no', easywooName: "no" },
        ],
        name: 'pressureToConform',
        easywooName: "conform_heterosexual_relationship",
        type: QuestionsType.SINGLE
      }
    ];

    for (const question of questions) {
      await prisma.question.upsert({
        where: { question: question.question },
        create: {
          step: question.step,
          question: question.question,
          name: question.name,
          type: question.type,
          midStepText: question.midStepTexts?.join('\n'),
          easywooName: question.easywooName,
          answers: {
            create: question.answers.map((answer) => ({
              answer: answer.answer,
              name: answer.name,
              evaluation: answer.evaluation,
              easywooName:  answer.easywooName
            }))
          }
        },
        update: {
          step: question.step,
          question: question.question,
          easywooName: question.easywooName,
          name: question.name,
          type: question.type,
          midStepText: question.midStepTexts?.join('\n')
        }
      });
    }
  }
}
