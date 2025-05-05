import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EasywooApiService {
  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService
  ) {
  }

  public async generateReport(questionnaire) {
    const url =  this.configService.get<string>('EASYWOO_API');
    const formData = new URLSearchParams();


    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((value) => formData.append(key, value));
      }else {
        formData.append(key, value);
      }
    })

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, formData.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      );

      console.log(response.data)


      return response.data;
    } catch (error) {
      console.log(error)
      console.error('Error sending report:', error.response?.data || error.message);
      throw new InternalServerErrorException('Error sending report');
    }
  }
}
