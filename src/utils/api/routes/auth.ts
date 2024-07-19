import {Tokens} from '../../api.types';
import axiosInstance from '../axiosInstance';

const auth = {
  login: (username: string, password: string) =>
    axiosInstance.get<Tokens>(
      `/logon-oauth2?username=${username}&password=${password}`,
    ),
  registrate: (
    email: string,
    password: string,
    fn: string,
    nm: string,
    ft: string,
    phone: string,
  ) =>
    axiosInstance.post<string>(
      `/reg?login=${email}&password=${password}&fn=${fn}&nm=${nm}&ft=${ft}&phone=${phone}`,
    ),
  resetPassword: (email: string) =>
    axiosInstance.get<string>(`/resetpass?login=${email}`),
};

export default auth;
