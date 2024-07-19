import {convertDate} from '../..';
import {MainData, MainGraph, TradePoints, User} from '../../api.types';
import axiosInstance from '../axiosInstance';

const main = {
  getTradePoints: () => axiosInstance.get<TradePoints>(`/api/readgtochka`),
  getUser: () => axiosInstance.get<User>('/api/getuser'),
  getMain: (gtochkaid: number) =>
    axiosInstance.get<MainData>(`/api/readmain?gtochkaid=${gtochkaid}`),
  getMainGraph: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<MainGraph[]>(
      `/api/readmaingraph?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
};

export default main;
