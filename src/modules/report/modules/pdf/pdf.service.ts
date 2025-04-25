import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as pdf from 'pdf-creator-node';
import { v4 as uuidv4 } from 'uuid';
import { getAbsoluteReportPath, getReportPath } from '../../../../utils/storage.utils';
import { ReportSectionDto } from '../../dto/reportSection.dto';
import { PdfLocationDto } from './dto/pdfLocation.dto';

const BASE_URL = process.env.BASE_URL;

@Injectable()
export class PdfService {

  public async generatePdfReport(report: ReportSectionDto[]): Promise<PdfLocationDto> {
    const options = {
      format: "A4",
      orientation: "portrait"
    }
    const html = fs.readFileSync("src/utils/template/report.html", "utf8");
    const fileName = uuidv4();
    const document = {
      html: html,
      data: {
        reportSection: report,
      },
      path: path.join(getAbsoluteReportPath(), `${fileName}.pdf`),
    };
    await pdf.create(document, options);
    return {location: new URL(`/${getReportPath()}/${fileName}.pdf`,BASE_URL)};
  }
}
