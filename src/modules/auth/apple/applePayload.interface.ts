interface ApplePayload {
  id: string;
  email: string;
  provider: string;
  emailVerified: boolean;
  name?: {
    firstName: string;
    lastName: string;
    middleName?: string;
  }
}