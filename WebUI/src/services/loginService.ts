import {AxiosResponse} from 'axios'
import http from '../axios/http-common'
import { LoginModel, RegisterModel } from '../models/login';

export class AccountService {
    static register(model: RegisterModel): Promise<AxiosResponse> {
        return http.post(`/register`, model);
      }
      static login(model: LoginModel): Promise<AxiosResponse> {
        return http.post(`/login`, model);
      }
}