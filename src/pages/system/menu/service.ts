import { MenuParams, MenuRecord, MenuRequest } from './type';

// import { PageResponse } from '@/typings/global';
import request from '@/utils/instance';

const URL = '/system/menus';

// export const query = async (params: Partial<MenuParams>): Promise<PageResponse<MenuRecord>> => {
//   return request.get(URL, {
//     params,
//   });
// };

export const queryTree = async (params: Partial<MenuParams>): Promise<MenuRecord[]> => {
  return request.get(`${URL}/tree`, {
    params,
  });
};
// export const queryTree = async (params: Partial<MenuParams>): Promise<MenuRecord[]> => {
//   return request.get(URL + 'tree', {
//     params,
//   });
// };

export const create = async (data: Partial<MenuRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<MenuRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<MenuRequest>) => {
  return request.delete(URL, { data });
};
