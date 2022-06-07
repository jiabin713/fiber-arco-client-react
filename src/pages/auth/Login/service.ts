import { LoginRequest, LoginResponse } from './type';

import request from '@/utils/instance';

const URL = '/auth/login';

export const login = async (data: Partial<LoginRequest>): Promise<LoginResponse> => {
  return request.post(URL, data);
};
