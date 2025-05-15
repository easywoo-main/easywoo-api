import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class SubscriptionWebhookGuard implements CanActivate {
  private readonly SUBSCRIPTION_WEBHOOK_TOKEN: string;
    constructor(configService: ConfigService) {
      this.SUBSCRIPTION_WEBHOOK_TOKEN = configService.get<string>('SUBSCRIPTION_WEBHOOK_TOKEN')
    }

  async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers?.authorization?.split(' ')?.pop();

        if (token !== this.SUBSCRIPTION_WEBHOOK_TOKEN) {
          throw new UnauthorizedException("Access denied. You are not authorized to access this resource");
        }

        return true
    }
}