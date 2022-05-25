import { RoleParams, RoleRecord, RoleRequest } from './type';

import { PageResponse } from '@/types/global';
import request from '@/utils/instance';

const URL = '/system/roles';

export const query = async (params: Partial<RoleParams>): Promise<PageResponse<RoleRecord>> => {
  return request.get(URL, {
    params,
  });
};

export const queryTree = async (params: Partial<RoleParams>): Promise<RoleRecord[]> => {
  return request.get(`${URL}/tree`, {
    params,
  });
};

export const create = async (data: Partial<RoleRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<RoleRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<RoleRequest>) => {
  return request.delete(URL, { data });
};
