import {Injectable, MethodNotAllowedException} from '@nestjs/common';
import {GenerateReportSectionInterface} from "../generateReportSection.interface";

@Injectable()
export class EmotionalBaggageService implements GenerateReportSectionInterface {
    name: string;
    generateReportSection(): string {
        throw new MethodNotAllowedException('Method not implemented.');
    }
}
