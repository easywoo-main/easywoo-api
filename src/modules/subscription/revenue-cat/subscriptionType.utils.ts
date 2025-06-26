import { SubscriptionType } from "./subscriptionType.enum";

const CREATE_SUBSCRIPTION_TYPES = [
  SubscriptionType.INITIAL_PURCHASE,
  SubscriptionType.UNCANCELLATION,
  SubscriptionType.RENEWAL,
  SubscriptionType.SUBSCRIPTION_EXTENDED,
  SubscriptionType.NON_RENEWING_PURCHASE,
];

const CANCEL_SUBSCRIPTION_TYPES = [
  SubscriptionType.SUBSCRIPTION_PAUSED,
  SubscriptionType.CANCELLATION,
  SubscriptionType.EXPIRATION,
];

const PAYMENT_ISSUE_TYPES = [SubscriptionType.BILLING_ISSUE];

export {
  CREATE_SUBSCRIPTION_TYPES,
  CANCEL_SUBSCRIPTION_TYPES,
  PAYMENT_ISSUE_TYPES,
};
