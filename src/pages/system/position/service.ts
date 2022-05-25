import { PositionParams, PositionRecord, PositionRequest } from './type.d';

import { PageResponse } from '@/types/global';
import request from '@/utils/instance';

const URL = '/system/positions';

export const query = async (params: Partial<PositionParams>): Promise<PageResponse<PositionRecord>> => {
  return request.get(URL, {
    params,
  });
};

export const create = async (data: Partial<PositionRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<PositionRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<PositionRequest>) => {
  return request.delete(URL, { data });
};