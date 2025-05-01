import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { getAbsoluteReportPath, getReportPath } from '../../../../utils/storage.utils';
import { ReportSectionDto } from '../../dto/reportSection.dto';
import { PdfLocationDto } from './dto/pdfLocation.dto';
import puppeteer from 'puppeteer';
import { reportTemplate } from './reportTemplate';

const BASE_URL = process.env.BASE_URL;

@Injectable()
export class PdfService {


  public async generatePdfReport(report: ReportSectionDto[]): Promise<PdfLocationDto> {
    const browser = await puppeteer.launch({
      headless: true,
      timeout: 60000,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--headless",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
    });
    const page = await browser.newPage();

    const html = reportTemplate(report);

    const fileName = uuidv4();
    const pdfPath = path.join(getAbsoluteReportPath(), `${fileName}.pdf`);

    const directory = path.dirname(pdfPath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    await page.setContent(html);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true
    });

    await browser.close();

    return { location: new URL(`/${getReportPath()}/${fileName}.pdf`, BASE_URL) };
  }
}
