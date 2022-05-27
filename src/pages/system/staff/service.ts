import { StaffParams, StaffRecord, StaffRequest } from './type';

import { PageResponse } from '@/types/global';
import request from '@/utils/instance';

const URL = '/system/staffs';

export const query = async (params: Partial<StaffParams>): Promise<PageResponse<StaffRecord>> => {
  return request.get(URL, { params });
};

export const create = async (data: Partial<StaffRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<StaffRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<StaffRequest>) => {
  return request.delete(URL, { data });
};
