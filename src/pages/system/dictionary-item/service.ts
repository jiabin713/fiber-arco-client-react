import { DictionaryItemParams, DictionaryItemRecord, DictionaryItemRequest } from './type';

import { PageResponse } from '@/types/global';
import request from '@/utils/instance';

const URL = '/system/dictionary/items';

export const query = async (params: Partial<DictionaryItemParams>): Promise<PageResponse<DictionaryItemRecord>> => {
  return request.get(URL, {
    params,
  });
};

export const create = async (data: Partial<DictionaryItemRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<DictionaryItemRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<DictionaryItemRequest>) => {
  return request.delete(URL, { data });
};
