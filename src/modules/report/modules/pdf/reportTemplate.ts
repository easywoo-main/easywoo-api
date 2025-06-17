import { ReportSectionDto } from '../../dto/reportSection.dto';

export const reportTemplate = (report: ReportSectionDto[]) => {
  return `  
  <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .section {
            margin-bottom: 20px;
          }
          .section h2 {
            margin: 0;
            padding: 5px 0;
            background-color: #f2f2f2;
            border: 1px solid #ccc;
          }
          .section p {
            margin: 0;
            padding: 5px 0;
          }
        </style>
      </head>
      <body>
        ${report
    .map(
      (section) => `
          <div class="section">
            <h2>${section.name}</h2>
            <p>${section.content}</p>
          </div>
        `
    )
    .join('')}
      </body>
    </html>`;
};