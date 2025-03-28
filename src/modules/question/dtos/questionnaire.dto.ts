export class QuestionnaireDto {
  // [key: string]: {
  //   [key: string]: boolean;
  // };

  gender: {
    male: boolean;
    female: boolean;
    nonBinary: boolean;
  };

  sexualOrientation: {
    straight: boolean;
    gay: boolean;
    bisexual: boolean;
    other: boolean;
  };

  ethnicity: {
    white: boolean;
    black: boolean;
    asian: boolean;
    mixed: boolean;
    other: boolean;
  };

  age: {
    '18-20': boolean;
    '21-25': boolean;
    '26-30': boolean;
    '31-35': boolean;
    '36-40': boolean;
    '41-45': boolean;
    '46-50': boolean;
    '51-60': boolean;
    '60+': boolean;
  };

  relationshipStatus: {
    single: boolean;
    commitedRelationship: boolean;
    itsComplicated: boolean;
    divorced: boolean;
  };

  children: {
    yes: boolean;
    no: boolean;
  };

  socialActivity: {
    notActive: boolean;
    somewhatActive: boolean;
    active: boolean;
    veryActive: boolean;
    hooked: boolean;
  };

  confidence: {
    notAtAll: boolean;
    justTrying: boolean;
    okayWithIt: boolean;
    confident: boolean;
    veryConfident: boolean;
  };

  socialize: {
    restaurant: boolean;
    club: boolean;
    gym: boolean;
    bar: boolean;
    activities: boolean;
    cafes: boolean;
    home: boolean;
    nowhere: boolean;
    socialMedia: boolean;
    work: boolean;
    college: boolean;
  };

  interestedRelationship: {
    casual: boolean;
    serious: boolean;
    sexual: boolean;
    friendship: boolean;
    committed: boolean;
    situationship: boolean;
    inARelationship: boolean;
  };

  personType: {
    independent: boolean;
    sociable: boolean;
    loyal: boolean;
    charitable: boolean;
    trustworthy: boolean;
    environmentallyAware: boolean;
    ambitious: boolean;
    reserved: boolean;
    adventurous: boolean;
    shy: boolean;
    passionate: boolean;
    possessive: boolean;
    practical: boolean;
    romantic: boolean;
    dynamic: boolean;
    sexualErotic: boolean;
    prudent: boolean;
    sensitive: boolean;
    humorous: boolean;
    spiritual: boolean;
    religious: boolean;
    wellReadIntellectual: boolean;
    successful: boolean;
    likesTidiness: boolean;
    petLover: boolean;
    vegetarianVegan: boolean;
    smoker: boolean;
    nonDrinker: boolean;
    casualDrinker: boolean;
    regularDrinker: boolean;
    bald: boolean;
    facialHair: boolean;
    wantChildren: boolean;
    bodyPiercings: boolean;
    haveTattoos: boolean;
  };
  biggestChallenges: {
    confidenceIssues: boolean;
    communicationProblems: boolean;
    tooOldToDate: boolean;
    runningOutOfTime: boolean;
    notHappyWithAppearance: boolean;
    weightIssues: boolean;
    notHappyWithSocialLife: boolean;
    busyToDate: boolean;
    dontKnowWhereToFindDates: boolean;
    noSingleFriends: boolean;
    wantToGetOutOfCurrentRelationship: boolean;
    burnedInRelationships: boolean;
    stuckOnMyEx: boolean;
    increaseDatingChances: boolean;
    noFollowUpOnlineDates: boolean;
    endUpInFriendZone: boolean;
    peopleDontWantToDateMe: boolean;
    stillLivingWithParents: boolean;
    financialInstability: boolean;
    pressureToStartFamily: boolean;
    awayFromHome: boolean;
  };

  interestedPersonType: {
    independent: boolean;
    sociable: boolean;
    loyal: boolean;
    charitable: boolean;
    trustworthy: boolean;
    environmentallyAware: boolean;
    ambitious: boolean;
    reserved: boolean;
    adventurous: boolean;
    shy: boolean;
    passionate: boolean;
    possessive: boolean;
    practical: boolean;
    romantic: boolean;
    dynamic: boolean;
    sexualErotic: boolean;
    prudent: boolean;
    sensitive: boolean;
    humorous: boolean;
    spiritual: boolean;
    religious: boolean;
    wellReadIntellectual: boolean;
    successful: boolean;
    likesTidiness: boolean;
    petLover: boolean;
    vegetarianVegan: boolean;
    smoker: boolean;
    nonDrinker: boolean;
    casualDrinker: boolean;
    regularDrinker: boolean;
    bald: boolean;
    facialHair: boolean;
    wantChildren: boolean;
    bodyPiercings: boolean;
    haveTattoos: boolean;
  };

  goals: {
    findRelationship: boolean;
    learnAttractPeople: boolean;
    improveSocialLife: boolean;
    findNewFriends: boolean;
    startFamily: boolean;
    selfDevelopment: boolean;
    improveSelfConfidence: boolean;
    improvePhysicalAppearance: boolean;
    improveBodyWeight: boolean;
    improveSexualLife: boolean;
    furtherCareer: boolean;
    furtherEducation: boolean;
    fixFinances: boolean;
    moveOutParentsHouse: boolean;
    moveOutRelationship: boolean;
    getOverEx: boolean;
    getOutFriendZone: boolean;
  };

  timeFrame: {
    month: boolean;
    sixMonths: boolean;
    year: boolean;
    noFirmTimeframe: boolean;
  };

  appearance: {
    notImportant: boolean;
    somewhatImportant: boolean;
    important: boolean;
    veryImportant: boolean;
  };

  interestedAge: {
    '18-20': boolean;
    '21-25': boolean;
    '26-30': boolean;
    '31-35': boolean;
    '36-40': boolean;
    '41-45': boolean;
    '46-50': boolean;
    '51-60': boolean;
    '60+': boolean;
  };

  interestedEthnicity: {
    dontMind: boolean;
    white: boolean;
    black: boolean;
    asian: boolean;
    mixed: boolean;
    other: boolean;
  };

  bodyType: {
    slim: boolean;
    athletic: boolean;
    average: boolean;
    curvy: boolean;
    large: boolean;
    other: boolean;
  };

  mateType: {
    independent: boolean;
    sociable: boolean;
    ambitious: boolean;
    reserved: boolean;
    adventurous: boolean;
    shy: boolean;
    passionate: boolean;
    practical: boolean;
    thoughtful: boolean;
    organized: boolean;
    helpful: boolean;
    charitable: boolean;
    trustworthy: boolean;
    environmentallyAware: boolean;
    romantic: boolean;
    sexualChemistry: boolean;
    commonInterests: boolean;
    loyal: boolean;
    dynamic: boolean;
    prudent: boolean;
    sensitive: boolean;
    humorous: boolean;
    spiritual: boolean;
    religiousActive: boolean;
    wellReadIntellectual: boolean;
    collegeGraduate: boolean;
    smart: boolean;
    financiallySuccessful: boolean;
    startFamily: boolean;
    notMarriedBefore: boolean;
    noChildrenFromPreviousRelationships: boolean;
    cleanlinessHigh: boolean;
    petLover: boolean;
    noAnimals: boolean;
    vegetarianVegan: boolean;
    nonSmoker: boolean;
    nonDrinker: boolean;
    casualDrinker: boolean;
    regularDrinker: boolean;
    bodyPiercings: boolean;
    tall: boolean;
    short: boolean;
    sexy: boolean;
    hasTattoos: boolean;
    localPerson: boolean;
    foreigner: boolean;
    closeVicinity: boolean;
    wantChildren: boolean;
  };

  starSign: {
    dontMind: boolean;
    aries: boolean;
    taurus: boolean;
    gemini: boolean;
    cancer: boolean;
    leo: boolean;
    virgo: boolean;
    libra: boolean;
    scorpio: boolean;
    sagittarius: boolean;
    capricorn: boolean;
    aquarius: boolean;
    pisces: boolean;
  };
}
