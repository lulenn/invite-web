import axios, { AxiosResponse } from 'axios';
import { IUserFormParams } from '../modules/UserModal';

const URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

export function postUserForm(data: IUserFormParams): Promise<AxiosResponse> {
  return axios.post(URL, data).catch(error => {
    throw new Error(error.response.data.errorMessage);
  });
}
