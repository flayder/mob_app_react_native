import {AxiosResponse} from 'axios';
import {convertDate} from '../..';
import {Sales, Sklad, ZakazInfo} from '../../api.types';
import axiosInstance from '../axiosInstance';

type GProductsSale = {
  gProductId: number;
  amount: number;
  cost: number;
};

export type GProductsReceipt = {
  gProductId: number;
  amount: number;
  price: number;
};

export type Body = {
  summ: number;
  summCash: number;
  summNoncash: number;
  summBonus: number;
  date: string;
};

export interface SellBody extends Body {
  gTochkaId: number;
  gProducts: GProductsSale[];
}
export interface SellEditBody extends Body {
  zakazId: number;
  gProducts: GProductsSale[];
}
export interface ReceiptBody extends Body {
  gTochkaId: number;
  type: number;
  gProducts: GProductsReceipt[];
}
export interface ReceiptEditBody extends Body {
  skladId: number;
  gProducts: GProductsReceipt[];

  type: number;
}

const trade = {
  getSales: (gtochkaid: number, datebegin: Date, dateend: Date) => {
    console.log('gtochkaid', gtochkaid)
    return axiosInstance.get<Sales>(
      `/api/readsales?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    )
  },
  getIncome: (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number,
  ) =>
    axiosInstance.get<Sklad>(
      `/api/readsklad?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}&page=${page}&rows=20&type=0`,
    ),
  getReturn: (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number,
  ) =>
    axiosInstance.get<Sklad>(
      `/api/readsklad?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}&page=${page}&rows=20&type=1`,
    ),
  getWritedOff: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<Sales>(
      `/api/readwritedoff?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
  getZakazInfo: (zakazid: number) =>
    axiosInstance.get<ZakazInfo>(`/api/readzakazdetails?zakazid=${zakazid}`),
  deleteSale: (zakazIds: number[]) =>
    axiosInstance.post<object, AxiosResponse<object>, number[]>(
      '/api/deletesales',
      zakazIds,
    ),
  deleteReceipt: (skladIds: number[]) =>
    axiosInstance.post<object, AxiosResponse<object>, number[]>(
      '/api/deletereceipt',
      skladIds,
    ),
  sell: (data: SellBody) =>
    axiosInstance.post<string, AxiosResponse<string>, SellBody>(
      '/api/sell',
      data,
    ),
  sellEdit: (data: SellEditBody) =>
    axiosInstance.post<string, AxiosResponse<string>, SellEditBody>(
      '/api/selledit',
      data,
    ),
  receipt: (data: ReceiptBody) =>
    axiosInstance.post<string, AxiosResponse<string>, ReceiptBody>(
      '/api/receipt',
      data,
    ),
  receiptEdit: (data: ReceiptEditBody) =>
    axiosInstance.post<string, AxiosResponse<string>, ReceiptEditBody>(
      '/api/receiptedit',
      data,
    ),
};

export default trade;
