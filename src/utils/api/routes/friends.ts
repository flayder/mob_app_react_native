import {Friend} from '../../api.types';
import axiosInstance from '../axiosInstance';

const friends = {
  getFriends: () => axiosInstance.get<Friend[]>('/api/readusers'),
  linkUser: (login: string, gtochkaids: string) =>
    axiosInstance.post<string>(`/api/linkuser?login=${login}${gtochkaids}`),
};

export default friends;
