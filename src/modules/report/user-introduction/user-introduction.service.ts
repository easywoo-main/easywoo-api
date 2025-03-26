import {Injectable, MethodNotAllowedException} from '@nestjs/common';
import {GenerateReportSectionInterface} from "../generateReportSection.interface";

@Injectable()
export class UserIntroductionService implements GenerateReportSectionInterface{
    name: string = 'Let’s look at you';
    generateReportSection(): string {
        throw new MethodNotAllowedException('Method not implemented.');
    }
}
