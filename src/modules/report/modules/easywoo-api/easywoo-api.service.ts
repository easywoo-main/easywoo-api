import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EasywooApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async generateReport(questionnaire: Record<string, any>) {
    const url = this.configService.get<string>('EASYWOO_API');
    const formData = new URLSearchParams();

    Object.entries(questionnaire).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, formData.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }),
      );

      const html = response.data;

      const match = html.match(/window\.location\s*=\s*"([^"]+)"/);
      const redirectUrl = match?.[1];

      if (!redirectUrl) {
        throw new Error('Redirect URL not found in script');
      }

      const cookies = response.headers['set-cookie'];

      const redirectResponse = await firstValueFrom(
        this.httpService.get(redirectUrl, {
          headers: {
            Cookie: cookies?.join('; ') || '', // передаємо всі куки
          },
        }),
      );

      return redirectResponse.data;
    } catch (error) {
      console.error('Error sending report:', error.response?.data || error.message);
      throw new InternalServerErrorException('Error sending report');
    }
  }
}
