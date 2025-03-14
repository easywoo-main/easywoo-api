export class Success {
  name: 'Success';
  message: string;
  status: 200;

  constructor(message: string) {
    this.message = message;
    this.name = 'Success';
    this.status = 200;
  }
}
