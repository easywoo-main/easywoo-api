

export class ChartDataDto {
  name: string;
  variable: string;
  data: {
    value: number;
    name: any;
  }[]
}