export type Currency = 'mdl' | 'usd' | 'eur';

type CreditCurrencies = Record<Currency, number>;

export interface IDetails {
  totalCredit: CreditCurrencies;
  usedCredit: CreditCurrencies;
  remainingCredit: CreditCurrencies;
}

export interface IAvansExchange {
  id: string;
  date: string;
  amount: number;
  exchangeRate: number;
  amountInMDL: number;
}

export interface IAvans {
  id: string;
  date: string;
  currency: Currency;
  amount: number;
  amountAvailableForExchange: number;
  exchanges?: IAvansExchange[];
}

export interface IExpense {
  id: string;
  name: string;
  date: string;
  itemType: string | null;
  quantity: number | null;
  currency: Currency;
  unitPrice: number | null;
  totalPrice: number;
}

export type ExpenseType = 'achizitii' | 'suplimentare';

export interface ISalariu {
  id: string;
  date: string;
  amount: number;
  currency: Currency;
}

export interface IMuncitor {
  name: string;
  id: string;
  salarii: ISalariu[];
}

export type ProjectWithWorkers = {
  id: string;
  name: string;
  workers: IMuncitor[];
};

export type ProjectProps =
  | 'details'
  | 'avansuri'
  | 'achizitii'
  | 'workers'
  | 'suplimentare';
export type ClientView = Record<ProjectProps, boolean>;

export interface IProject {
  name: string;
  details: IDetails;
  avansuri: IAvans[];
  achizitii: IExpense[];
  workers: IMuncitor[];
  suplimentare: IExpense[];
  clientAccess: ClientView;
}

export interface IProjectInfo {
  name: string;
  id: string;
}

export interface IExchange {
  eur: number;
  usd: number;
}
