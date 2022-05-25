import { DictionaryParams, DictionaryRecord, DictionaryRequest } from './type';

import { DictionaryItemRecord } from '../dictionary-item/type';
import { PageResponse } from '@/types/global';
import request from '@/utils/instance';

const URL = '/system/dictionaries';

export const query = async (params: Partial<DictionaryParams>): Promise<PageResponse<DictionaryRecord>> => {
  return request.get(URL, {
    params,
  });
};

export const queryItems = async (code: string): Promise<DictionaryItemRecord[]> => {
  return request.get(`${URL}/${code}`);
};

export const create = async (data: Partial<DictionaryRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<DictionaryRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<DictionaryRequest>) => {
  return request.delete(URL, { data });
};
