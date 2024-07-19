import {convertDate} from '../..';
import {ConReport} from '../../api.types';
import axiosInstance from '../axiosInstance';

const conReport = {
  getConReport: (gtochkaid: number, datebegin: Date) =>
    axiosInstance.get<ConReport>(
      `/api/readconsolidated?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}`,
    ),
};

export default conReport;
