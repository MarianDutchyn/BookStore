import {UserBilling} from './user-billing';

export class UserPayment {
  public id: number;
  public type: string;
  public cardName: string;
  public CardNumber: string;
  public expiryMonth: string;
  public expiryYear: string;
  public cvc: number;
  public holderName: string;
  public defaultPayment: boolean;
  public userBilling: UserBilling;
}
