import {convertDate} from '../..';
import {
  AvgReceipt,
  ReturnsProducts,
  SalesGroups,
  SalesMonth,
  SalesProducts,
  TopSales,
} from '../../api.types';
import axiosInstance from '../axiosInstance';

const reports = {
  getSalesByProducts: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<SalesProducts>(
      `/api/readsalesproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
  getSalesByGroups: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<SalesGroups>(
      `/api/readsalesgroupproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
  getSalesByMonth: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<SalesMonth>(
      `/api/readsalesgroupmonth?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
  getReturnsByProducts: (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number,
    descending: boolean = true,
  ) =>
    axiosInstance.get<ReturnsProducts>(
      `/api/readreturnsproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(
        dateend,
      )}&page=${page}&descending=${descending}&rows=10&sortField=summ`,
    ),
  getTopSales: (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    descending: boolean,
  ) =>
    axiosInstance.get<TopSales>(
      `/api/readtopsalesproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(
        dateend,
      )}&descending=${descending}&page=0&rows=4&sortField=amount`,
    ),
  getAvgReceipt: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<AvgReceipt[]>(
      `/api/readaveragezakaz?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
};

export default reports;
