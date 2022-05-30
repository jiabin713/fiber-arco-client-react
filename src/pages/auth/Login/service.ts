import { LoginRequest } from './type.d';
import request from '@/utils/instance';

const URL = '/auth/login';

export const login = async (data: Partial<LoginRequest>) => {
  return request.post(URL, data);
};
