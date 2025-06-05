import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { getReportPath } from '../../../../utils/storage.utils';
import { ReportSectionDto } from '../../dto/reportSection.dto';
import { PdfLocationDto } from './dto/pdfLocation.dto';
import puppeteer from 'puppeteer';
import { reportTemplate } from './reportTemplate';

const BASE_URL = process.env.BASE_URL;

@Injectable()
export class PdfService {


  public async generatePdfReport(report: ReportSectionDto[], reportId? : string): Promise<PdfLocationDto> {
    const html = reportTemplate(report);
    return this.generatePdfReportFromHtml(html, reportId || uuidv4())
  }

  public async generatePdfReportFromHtml(html: string, reportId: string){
    const fileName = Date.now()+ "-" + reportId;

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
    const pdfPath = path.join(getReportPath(), `${fileName}.pdf`);

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
