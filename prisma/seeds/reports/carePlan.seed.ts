import { CourseType, PrismaClient, SentenceType } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';
import { Prisma } from '.prisma/client';

export class CarePlanSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
      dbFindManyArgs: Prisma.CourseFindManyArgs;
    }[] = [
      {
        sentence:
          'As mentioned in your report should you need help on the subjects of shyness and / or low confidence or low self-esteem we are here to provide important material Check the links\n',
        condition: {
          'personType.reserved': true,
          OR: {
            'personType.humorous': true,
            'personType.sociable': true,
          },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'self-esteem-confidence-n',
              },
            },
          },
        },
      },
      {
        sentence: 'Check the link below for more information on HSP',
        condition: {
          'personType.sensitive': true,
          'personType.reserved': true,
          'personType.shy': true,
          'biggestChallenges.notHappyWithSocialLife': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'mental-health-2' }, { slug: 'self-esteem-confidence-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'We believe that these books and Webinars on building confidence will indeed enrich your life.\n',
        condition: {
          'personType.humorous': true,
          'personType.sociable': true,
          'biggestChallenges.friendzoned': true,
          'biggestChallenges.confidenceIssues': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'self-esteem-confidence-n' }, { slug: 'mental-health-2' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Time management is wrongly, mostly associated with career issues. In reality time as a concept is of utmost importance, as getting time distribution wrong, can have a detrimental effect on all aspects of life. \n' +
          'Getting help from a coach or utilising our selected books and webinars on time and stress management will assist you in managing yourself in your day-to-day life and successfully reach your goals..\n',
        condition: {
          'personType.ambitious': true,
          'personType.sociable': true,
          'biggestChallenges.busyToDate': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }, { slug: 'stress-management-2' }, { slug: 'time-management-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'If you would like to know more about expanding your comfort zone read on.\n',
        condition: {
          'personType.adventurous': true,
          'personType.independent': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }, { slug: 'comfort-zone-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'If you would like to know more about enpowering your independent streak and expanding your comfort zone read on.\n',
        condition: {
          'personType.adventurous': true,
          'personType.independent': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'food-drink' }, { slug: 'physical-active-n' }, { slug: 'travelling-n' }, { slug: 'comfort-zone-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Being an ambitious character you surely have specific likes in how you like to spend your free time. We think the links below will help you both socially and to find a good match.\n',
        condition: {
          'personType.passionate': true,
          'personType.ambitious': true,
          OR: {
            'personType.shy': true,
            'personType.sensitive': true,
          },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }, { slug: 'volunteer-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Having a healthy self-esteem and a good confidence are the most important tools in getting ahead in life especially in interpersonal relationships. Check the links below for great material.',
        condition: {
          'biggestChallenges.confidenceIssues': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'comfort-zone-n' }, { slug: 'law-of-attraction-n' }, { slug: 'mental-health-professionals-n' }, { slug: 'self-esteem-confidence-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Communicating well can help you maintain good relationships, avoid conflict and increase your likelihood of getting what you want. Learn how active listening, assertive communication and body language all add up to great communication skills. In addition, building up your confidence is a vital part in this process. We have prepared a bundle of suggestions on this subject.',
        condition: {
          GTE: { 'self_improvement.communication_problems': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'communication-skills-n',
              },
            },
          },
        },
      },
      {
        sentence:
          'The reality is that everyone is different in appearance, talents and abilities. Some of us may judge ourselves against others, but part of building confidence is about focusing on our own strong points and using them to make us proud of who we are. If you find that your insecurity regarding your appearance deters you from being as comfortable as you should be when meeting possible relationships, check these:',
        condition: {
          GTE: { 'self_improvement.appearance_problems': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [
                  { slug: 'dermatologists-n' },
                  { slug: 'cosmetic-dentistry-n' },
                  { slug: 'plastic-surgeons-n' },
                  { slug: 'cosmetic-dentistry-n' },
                  { slug: 'beauty-n' },
                  { slug: 'physical-active-n' },
                  { slug: 'self-esteem-confidence-n' },
                ],
              },
            },
          },
        },
      },
      {
        sentence:
          'Our advice is to firstly consult a nutritional professional to help you clarify your goals as far as your weight issues are concerned. If you find that your weight affects your confidence to properly project yourself then you should look at the material we have picked for you. If you need to dig deeper, a good way is through therapy.',
        condition: {},
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [
                  { slug: 'alternative-therapies' },
                  { slug: 'physical-active-n' },
                  { slug: 'comfort-zone-n' },
                  { slug: 'weight-management-personal-development-n' },
                  { slug: 'dieticians-nutritionists-n' },
                ],
              },
            },
          },
        },
      },
      {
        sentence:
          'As promised, here is a sample of venues to visit and groups that you can join as a start to your journey for a richer social life. Of course, you can find more choices in our Index. \n' +
          'If you feel that you have deeper issues you need to firstly work through, it may be best if you consult a coach or a therapist.\t\t\n',
        condition: {
          GTE: { 'self_improvement.loneliness_stress_motivation': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'comfort-zone-n' }, { slug: 'stress-management-n' }, { slug: 'venues-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'These simple rules on casual sex may help you simplify your dating game.\n',
        condition: {
          'mateRelationship.sexual': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'flirting-advice-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'You are just looking for a date. That’s great. Please follow our links on all possible ways you can utilize in order to find your ideal mate..\n',
        condition: {
          GTE: { 'other.just_date': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'flirting-advice-n',
              },
            },
          },
        },
      },
      {
        sentence:
          'Below you can find various ideas on how to go about creating new connections as well as several links to help you get started:\n' +
          '<ul>\n' +
          '<li> Attend community events. Keep an eye out for groups or clubs that gather around an interest or hobby you share. You may find these groups online. Do a Google search using terms such as [your city] + social network, or [your neighbourhood] + meetups.</li>\n' +
          '<li> Volunteer. Offer your time or talents at a community centre, charitable group or other organization. You can form strong connections when you work with people who have mutual interests.</li>\n' +
          '<li> Extend and accept invitations. Invite an acquaintance to join you for coffee or lunch or even just a drink. When you are invited to a social gathering, say yes. Contact someone who recently invited you to an activity and return the invitation.</li>\n' +
          '<li> Take up a new interest. Take a college or community education course to meet people who have similar interests. Join a class at a local gym or any sport or walking tours </li>\n' +
          '<li> Join a faith community. Take advantage of special activities and get-to-know-you events for new members.</li>\n' +
          '<li> Take a walk. Head to a popular park and strike up conversations there.</li>\n' +
          '<li> Go to a cafe with your laptop and work from there. Try to start a conversation with others that also work from there alone.</ul>\n' +
          'Above all, stay positive and confident. You may not become friends with everyone you meet, but maintaining a friendly attitude and demeanour can help you improve the relationships in your life.</li>\n' +
          'Check out the links below on conversation starters and current topics of discussion.\n' +
          'Lastly but very important, note that being content with oneself is always helpful! So if you find that you suffer from discontent with yourself, it may be a good idea to look at the recommended reading. As promised below you will find several links on all the important elements needed in order to get yourself ready to find new people and create new friendships.\t\t\n',
        condition: {},
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }, { slug: 'volunteer-n' }, { slug: 'venues-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Should you find that you need a more in-depth guidance on keeping your identity hidden or should you decide that you want to re-examine this decision, we recommend that you check out the links provided for experienced LGBTQ+ advice.\n',
        condition: {
          GTE: { 'sexuality_gay_bi.want_gay_relationship_closet': 15 },
          'sexualOrientation.straight': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'coming-out-n' }, { slug: 'relationships-n-lgbtq-community' }, { slug: 'mental-health-professionals-n' }, { slug: 'comfort-zone-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Needing to venture out of your relationship with a same gender mate is a subject that can be looked at from two different angles. One has to do with just going with the flow of the moment and living this experience. For this choice we will provide you with quick and practical solutions. If though, you feel the need to examine the other parameters we have laid out to you in your personalised report, we are also providing material that will hopefully cover you.\t\n',
        condition: {},
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {},
            },
          },
        },
      },
      {
        sentence:
          'Below you will find links covering all matters relating to coming out. Should you find that you need a more in depth guidance to this process, we recommend that you check out the links provided for experienced LGBTQ+ advice.\n',
        condition: {
          GTE: { 'sexuality_gay_bi.want_come_out': 15 },
          'sexual_orientation.straight': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'coming-out-n' }, { slug: 'relationships-n' }, { slug: 'mental-health-professionals-n' }, { slug: 'sexuality-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'If you are afraid to enter a gay relationship check our recommended material.',
        condition: {
          GTE: { 'sexuality_gay_bi.sexuality_gay_bi': 15 },
          'sexualOrientation.straight': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'relationships-n-lgbtq-community',
              },
            },
          },
        },
      },
      {
        sentence: 'For information and support on having a family as an LGBTQ+ person follow our links.',
        condition: {
          GTE: { 'sexuality_gay_bi.start_family_gay_partner': 15 },
          'sexualOrientation.straight': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'family-n',
              },
            },
          },
        },
      },
      {
        sentence:
          'Our advice is to prioritize your wants, and avoid characteristics that may not be that important. The links below may help you narrow down what is important to you and help you widen your choices:.',
        condition: {
          GTE: { 'awareness_objectives.picky': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'flirting-advice-n',
              },
            },
          },
        },
      },
      {
        sentence: "Having identified that you may need to improve your 'interviewing' and 'filtering' techniques we suggest that you follow the links below.",
        condition: {
          GTE: { 'awareness_objectives.wrong_choice_partner': 15 },
          OR: {
            'mateRelationship.commitedRelationship': true,
            'mateRelationship.friendship': true,
          },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [
                  { slug: 'mental-health-professionals-n' },
                  { slug: 'toxic-relationships-handling-n' },
                  { slug: 'flirting-advice-n' },
                  { slug: 'psychologists-n-mental-health-professionals-n' },
                  { slug: 'psychotherapists-counselors-n' },
                  { slug: 'self-esteem-confidence-n' },
                ],
              },
            },
          },
        },
      },
      {
        sentence: 'If getting over your ex proves to be too hard for you, you may benefit from the books and webinars we have identified for you:',
        condition: {
          GTE: { 'self_improvement.get_over_ex': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [
                  { slug: 'breaking-up-advice-n' },
                  { slug: 'flirting-advice-n' },
                  { slug: 'self-esteem-confidence-n' },
                  { slug: 'psychotherapists-counselors-n' },
                  { slug: 'toxic-relationships-handling-n' },
                ],
              },
            },
          },
        },
      },
      {
        sentence: 'A good place to start your search for a possible new acquaintances, friends or a mate would be a new hobby or activity. Check out our links for ideas.',
        condition: {
          'opportunity.new_location': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'It may be a good idea to read the link on casual dating rules.\t',
        condition: {},
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {},
            },
          },
        },
      },
      {
        sentence: 'These books and seminars can get you out of the loop of acting out past traumas.',
        condition: {
          'biggestChallenges.burnedInRelationships': true,
          'mateRelationship.committed': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'anger-management' }, { slug: 'breaking-up-advice-n' }, { slug: 'toxic-relationships-handling-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'As we mentioned in our report simply preferring short - term relationships is not necessarily indicative of a commitment issue. However, if you really want a committed relationship but you struggle with the concept then you could benefit from our suggestions below.',
        condition: {
          GTE: { 'self_improvement.commitment_issues': 15 },
          OR: {
            'mateRelationship.casual': true,
            'mateRelationship.sexual': true,
            'mateRelationship.situationship': true,
          },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'commitment-issues-n',
              },
            },
          },
        },
      },
      {
        sentence:
          'Below we recommend venues and activities as well as other possibilities that can definitely enrich your social life. As promised in our report we can also help you identify what other factors may block you from being successful in fully exploring your opportunities and exposure. Check the links below.',
        condition: {
          GTE: { 'opportunity.no_social_life': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }, { slug: 'communication-skills-n' }, { slug: 'venues-n' }, { slug: 'commitment-issues-n' }, { slug: 'law-of-attraction-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Below we recommend venues and activities as well as other possibilities that can definitely enrich your social life. As promised in our report we can also help you identify what оther factors may block you from being successful in fully exploring your opportunities and exposure. Check the links belоw.',
        condition: {
          GTE: { 'opportunity.no_social_life': 15 },
          'biggestChallenges.notHappyWithSocialLife': true,
          OR: {
            'personType.shy': true,
            'biggestChallenges.communicationProblems': true,
          },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [
                  { slug: 'activities-hobbies-n' },
                  { slug: 'communication-skills-n' },
                  { slug: 'self-esteem-confidence-n' },
                  { slug: 'tattoo-artists-n' },
                  { slug: 'venues-n' },
                ],
              },
            },
          },
        },
      },
      {
        sentence: 'Many relationships are created through common interests or hobbies. Check our links below for plenty of ideas on where and how to find your ideal mate.',
        condition: {
          'opportunity.mate_hungs_out': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'travelling-n' }, { slug: 'music-dance-n' }, { slug: 'outdoor-adventure' }, { slug: 'volunteer-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'To help yourself get rid of any age related limiting beliefs follow our suggestions below',
        condition: {
          GTE: { 'awareness_objectives.age': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'beauty-n' }, { slug: 'self-esteem-confidence-n' }, { slug: 'plastic-surgeons-n' }, { slug: 'dermatologists-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Being an ambitious character you surely have specific likes in how you like to spend your free time. We think the links below will help you both socially and to find a good match.',
        condition: {
          'personType.ambitious': true,
          'biggestChallenges.notHappyWithSocialLife': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }, { slug: 'venues-n' }, { slug: 'volunteer-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'Being an ambitious character you surely have specific likes in how you like to spend your free time. We think the links below will help you find a good match.\t',
        condition: {
          'personType.ambitious': true,
          'biggestChallenges.notHappyWithSocialLife': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'activities-hobbies-n' }, { slug: 'venues-n' }, { slug: 'volunteer-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'We have prepared some reading material on the spectrum of romantic, erotic, and sexual connection between two people that may interest you.',
        condition: {
          GTE: { 'self_improvement.sexuality_problems': 15 },
          'mateRelationship.committed': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'sexuality-n' }, { slug: 'sex-therapy-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'Go to our links on how to increase your chances of going on to a second date:',
        condition: {
          GTE: { 'awareness_objectives.no_follow': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'flirting-advice-n' }, { slug: 'law-of-attraction-n' }, { slug: 'social-media-consultants-n' }, { slug: 'stylists-image-consultants-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'To set up you social media footprint in a way that will maximize your relationship efforts, seek professional assistance, from our list below. This can help you set up your online profile in an optimal way and guide you on the right social media usage.',
        condition: {
          GTE: { 'opportunity.wrong_use_SM': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'social-media-consultants-n',
              },
            },
          },
        },
      },
      {
        sentence:
          'Time management is wrongly, mostly associated with career issues. In reality time as a concept is of utmost importance, as getting time distribution wrong, can have a detrimental effect on all aspects of life.' +
          'Getting help from a coach or utilising our selected books and webinars on time management will assist you in managing yourself in your day-to-day life and successfully reach your goals.',
        condition: { GTE: { 'self_improvement.time_management': 15 } },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'life-coaches-n' }, { slug: 'stress-management-n' }, { slug: 'time-management-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'To check out all possible options to understand your relationship to money or solutions to better your finances please check the following links.',
        condition: {
          GTE: { 'other.financial_instability': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'financial-management-n' }, { slug: 'stress-management-n' }],
              },
            },
          },
        },
      },
      {
        sentence:
          'You are looking to further your career. If this matter plays a hindering role in your love life then it may be a good idea to look more closely into how you would like to handle this issue short term and long term.',
        condition: {
          GTE: { 'other.further_career': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'career-development-n' }, { slug: 'comfort-zone-n' }, { slug: 'life-coaches-n' }, { slug: 'stress-management-n' }, { slug: 'time-management-n' }],
              },
            },
          },
        },
      },
      {
        sentence: 'To check out all options on buying time for having a child as well as emotional support please check the links below.',
        condition: {
          GTE: { 'other.fertility_issues': 15 },
          'mateRelationship.committed': true,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [
                  { slug: 'fertility-clinics-n' },
                  { slug: 'law-of-attraction-n' },
                  { slug: 'meditation-n' },
                  { slug: 'mental-health-professionals-n' },
                  { slug: 'stress-management-n' },
                ],
              },
            },
          },
        },
      },
      {
        sentence:
          'If you cannot move out of your family home because of any of the reasons mentioned in the report we provided for you, check out the readings below. We are sure you will find the one that matches your case.',
        condition: {
          GTE: { 'other.living_with_parents': 15 },
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                slug: 'financial-management-n',
              },
            },
          },
        },
      },
      {
        sentence:
          'As far as any pain points you may have concerning your sexual identity , our advice is to seek professional help that can guide you towards your objective. For now take a look at the list below for guidance.',
        condition: {
          GTE: { 'opportunity.sexuality_lgbt': 15 },
          'sexualOrientation.straight': false,
        },
        dbFindManyArgs: {
          where: {
            type: CourseType.JOB_LISTING,
            tags: {
              some: {
                OR: [{ slug: 'life-coaches-n' }, { slug: 'psychologists-n-mental-health-professionals-n' }, { slug: 'psychotherapists-counselors-n' }, { slug: 'relationships-n' }],
              },
            },
          },
        },
      },
    ];

    for (const sentenceEntity of sentences) {
      await prisma.sentence.upsert({
        where: {
          sentence: sentenceEntity.sentence,
        },
        update: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          dbFindManyArgs: JSON.stringify(sentenceEntity.dbFindManyArgs),
          type: SentenceType.CARE_PLAN,
        },
        create: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          dbFindManyArgs: JSON.stringify(sentenceEntity.dbFindManyArgs),
          type: SentenceType.CARE_PLAN,
        },
      });
    }
  }
}
