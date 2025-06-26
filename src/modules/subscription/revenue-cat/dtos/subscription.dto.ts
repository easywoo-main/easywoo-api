import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionType } from '../subscriptionType.enum';

class SubscriberAttribute {

    @ApiProperty({ description: 'Timestamp of the last update in milliseconds', type: Number })
    updated_at_ms: number;

    @ApiProperty({ description: 'Email address of the subscriber', type: String })
    value: string;
}

class SubscriptionEvent {
  @ApiProperty({ description: 'Event timestamp in milliseconds', type: Number })
  event_timestamp_ms: number;

  @ApiProperty({ description: 'Product ID associated with the subscription', type: String })
  product_id: string;

  @ApiProperty({ description: 'Type of subscription period', type: String })
  period_type: string;

  @ApiProperty({ description: 'Purchase timestamp in milliseconds', type: Number })
  purchased_at_ms: number;

  @ApiProperty({ description: 'Expiration timestamp in milliseconds', type: Number })
  expiration_at_ms: number;

  @ApiProperty({ description: 'Environment of the subscription (e.g., production, sandbox)', type: String })
  environment: string;

  @ApiProperty({ description: 'Entitlement ID', type: String, nullable: true })
  entitlement_id: string | null;

  @ApiProperty({ description: 'List of entitlement IDs', type: [String] })
  entitlement_ids: string[];

  @ApiProperty({ description: 'Presented offering ID', type: String, nullable: true })
  presented_offering_id: string | null;

  @ApiProperty({ description: 'Transaction ID', type: String })
  transaction_id: string;

  @ApiProperty({ description: 'Original transaction ID', type: String })
  original_transaction_id: string;

  @ApiProperty({ description: 'Indicates if family sharing is enabled', type: Boolean })
  is_family_share: boolean;

  @ApiProperty({ description: 'Country code of the user', type: String })
  country_code: string;

  @ApiProperty({ description: 'App user ID', type: String })
  app_user_id: string;

  @ApiProperty({ description: 'List of aliases for the user', type: [String] })
  aliases: string[];

  @ApiProperty({ description: 'Original app user ID', type: String })
  original_app_user_id: string;

  @ApiProperty({ description: 'Currency used for the transaction', type: String })
  currency: string;

  @ApiProperty({ description: 'Price of the subscription', type: Number })
  price: number;

  @ApiProperty({ description: 'Price in the purchased currency', type: Number })
  price_in_purchased_currency: number;

  @ApiProperty({ description: 'Subscriber attributes' })
  subscriber_attributes: Record<string, SubscriberAttribute>;

  @ApiProperty({ description: 'Store where the subscription was purchased', type: String })
  store: string;

  @ApiProperty({ description: 'Take-home percentage for the subscription', type: Number })
  takehome_percentage: number;

  @ApiProperty({ description: 'Offer code applied to the subscription', type: String, nullable: true })
  offer_code: string | null;

  @ApiProperty({ description: 'Type of subscription event', type: String })
  type: SubscriptionType;

  @ApiProperty({ description: 'Unique ID of the subscription event', type: String })
  id: string;

  @ApiProperty({ description: 'App ID associated with the subscription', type: String })
  app_id: string;
}

class SubscriptionDto {
  @ApiProperty({ description: 'Details of the subscription event', type: SubscriptionEvent })
  event: SubscriptionEvent;

  @ApiProperty({ description: 'API version of the subscription event', type: String })
  api_version: string;
}

export { SubscriptionDto, SubscriptionEvent, SubscriberAttribute };