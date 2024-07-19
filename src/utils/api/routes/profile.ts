import axiosInstance from '../axiosInstance';

const profile = {
  updateUser: (
    fn: string,
    nm: string,
    ft: string,
    phone: string,
    oldpwd: string,
    newpwd: string,
  ) =>
    axiosInstance.post<string>(
      `/api/edituser?fn=${fn}&nm=${nm}&ft=${ft}&phone=${phone}${
        oldpwd ? `&oldpwd=${oldpwd}` : ''
      }${newpwd ? `&newpwd=${newpwd}` : ''}`,
    ),

  deleteAccount: () => axiosInstance.post<string>('/api/deleteAccount'),
};

export default profile;
