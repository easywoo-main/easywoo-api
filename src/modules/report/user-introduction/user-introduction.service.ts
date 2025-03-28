import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { GenerateReportSectionInterface } from '../generateReportSection.interface';
import { QuestionnaireDto } from '../../question/dtos/questionnaire.dto';

@Injectable()
export class UserIntroductionService implements GenerateReportSectionInterface {
  name: string = 'Let’s look at you';
  generateReportSection(questionnaire: QuestionnaireDto): string {
    let result = '';
    if (questionnaire.personType.sensitive) {
      result = 'You are a sensitive person and can be emotional, especially when in a relationship. Be careful you don’t get too intense. ';
    }

    if (questionnaire.personType.reserved && (questionnaire.personType.humorous || questionnaire.personType.sociable)) {
      result += 'You tend to be reserved. If this is because of shyness or lack of confidence check our recommendations.';
    }

    if (questionnaire.personType.reserved && questionnaire.personType.sociable) {
      result +=
        'You tend to be rather self-aware. You have a need for lots of time alone, does this allow you to socialise enough? You take more time thinking than acting. You make for an incredible friend, as you are loyal and stable. If being reserved is a personality trait, then you should embrace it with pride! But if it hides shyness or lack of confidence then you should look at our recommendations.';
    }

    if (questionnaire.personType.romantic) {
      result += 'You connect with life primarily with feelings rather than logic.';
    }

    if (questionnaire.personType.sensitive && questionnaire.personType.reserved && questionnaire.personType.shy && questionnaire.biggestChallenges.notHappyWithSocialLife) {
      result += 'You are shy and sensitive. You may be a Highly Sensitive Person ( HSP). This may encourage retreating from events or gatherings.';
    }

    if (
      questionnaire.personType.humorous &&
      questionnaire.personType.sociable &&
      !questionnaire.biggestChallenges.endUpInFriendZone &&
      !questionnaire.biggestChallenges.confidenceIssues
    ) {
      result += 'Your outgoing personality is one of your strong points.';
    }

    if (
      questionnaire.personType.humorous &&
      questionnaire.personType.sociable &&
      questionnaire.biggestChallenges.endUpInFriendZone &&
      !questionnaire.biggestChallenges.confidenceIssues
    ) {
      result += 'You are sociable and humorous. Careful not to overuse instead of bringing out the erotic you.';
    }

    if (questionnaire.personType.humorous && questionnaire.personType.sociable && questionnaire.biggestChallenges.confidenceIssues) {
      result += 'You have an outgoing personality. You may tend to be a people pleaser.';
    }

    if (questionnaire.personType.ambitious && questionnaire.personType.sociable && questionnaire.biggestChallenges.busyToDate) {
      result += 'You know how to achieve targets but may forget to live in the moment.';
    }

    if (questionnaire.personType.adventurous && questionnaire.personType.independent) {
      result += 'You like to try new experiences and to push yourself out of your comfort zone. You place high value on independence.';
    }

    if (questionnaire.personType.adventurous && !questionnaire.personType.independent) {
      result += 'You like to try new experiences and to push yourself out of your comfort zone.';
    }

    if (questionnaire.mateType.adventurous && (questionnaire.mateType.reserved || questionnaire.mateType.prudent)) {
      result += 'You want to break out of your “box”';
    }

    if (!questionnaire.personType.ambitious && questionnaire.personType.passionate) {
      result += 'You don’t call yourself ambitious but you will be once you find your true calling. Check our links.';
    }

    if (questionnaire.personType.ambitious && questionnaire.personType.passionate && (!questionnaire.personType.shy || !questionnaire.personType.sensitive)) {
      result += 'You are growth oriented and not afraid to get out of your comfort zone. These are attractive traits.';
    }

    if (questionnaire.personType.ambitious && questionnaire.personType.passionate && (questionnaire.personType.shy || questionnaire.personType.sensitive)) {
      result += 'You are persistent and don’t mind difficulties as long as you develop.';
    }

    if (questionnaire.personType.ambitious && questionnaire.biggestChallenges.notHappyWithSocialLife) {
      result +=
        'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group.';
    }

    if (questionnaire.personType.ambitious && !questionnaire.biggestChallenges.notHappyWithSocialLife) {
      result +=
        'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group. To beat your lack of time choose activities that are easy to join.';
    }

    //todo

    return '';
  }
}
