import * as DictionaryService from './service';

import { DictionaryParams, DictionaryRecord, DictionaryRequest } from './type';
import { Message, Modal } from '@arco-design/web-react';
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';

import { PageResponse } from '@/types/global';
import { useMutation } from 'react-query';

export enum ServerStateKeysEnum {
  query = 'dictionary-query',
}

export const useDictionaries = (
  params: Partial<DictionaryParams>,
  options?: UseQueryOptions<PageResponse<DictionaryRecord>>,
) => {
  const queryInfo = useQuery<PageResponse<DictionaryRecord>>(
    [ServerStateKeysEnum.query, params],
    () => DictionaryService.query(params),
    options,
  );
  return queryInfo;
};

export const useDictionaryMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation(
    (req: Partial<DictionaryRequest>) => {
      const submit = req.id ? DictionaryService.update : DictionaryService.create;
      return submit(req);
    },
    {
      onMutate: () => {
        Message.loading(`正在${title}数据...`);
      },
      onSuccess: () => {
        Message.clear();
        Message.success(`${title}成功`);
        queryClient.invalidateQueries(ServerStateKeysEnum.query);
      },
      onError: () => {
        Message.clear();
        Message.error(`${title}失败`);
      },
    },
  );
};

export const useDictionaryDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<DictionaryRequest>) => {
      return DictionaryService.remove(req);
    },
    {
      onMutate: (variables) => {
        Message.loading(`正在${variables.name}数据...`);
      },
      onSuccess: (_, variables) => {
        Message.clear();
        Message.success(`${variables.name}删除成功`);
      },
      onError: (_, variables) => {
        Message.clear();
        Message.error(`${variables.name}删除失败`);
      },
    },
  );

  const confirmRemove = (record: Partial<DictionaryRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选菜单?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () =>
        deleteMutation.mutateAsync(record, {
          onSuccess: () => {
            if (onSuccess()) {
              queryClient.invalidateQueries(ServerStateKeysEnum.query);
            }
          },
        }),
    });
  };

  return { deleteMutation, confirmRemove };
};
