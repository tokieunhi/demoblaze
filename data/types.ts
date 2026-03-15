export interface IUser {
  userName: string;
  password: string;
  token?: string;
}

export interface IOrderDetails {
  name: string;
  country: string;
  city: string;
  credit_card: string;
  month: string;
  year: string;
}
