import {Remainders} from '../../api.types';
import axiosInstance from '../axiosInstance';

const remainders = {
  getRemainders: (
    gtochkaid: number,
    page: number,
    descending: boolean = true,
    cnt: string = '',
    filter: string = '',
    rows: number = 10,
    sort: string = 'amount'
  ) =>
    axiosInstance.get<Remainders>(
      `/api/remainders?gtochkaid=${gtochkaid}&page=${page}&cnt=${cnt}&filter=${filter}&rows=${rows}&sortField=${sort}&descending=${descending}`,
    ),
};

export default remainders;
