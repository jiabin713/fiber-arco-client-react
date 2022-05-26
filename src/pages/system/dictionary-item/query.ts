import * as DictionaryItemService from './service';

import { DictionaryItemParams, DictionaryItemRecord, DictionaryItemRequest } from './type';
import { Message, Modal } from '@arco-design/web-react';
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';

import { PageResponse } from '@/types/global';
import { useMutation } from 'react-query';

export enum ServerStateKeysEnum {
  query = 'dictionary-item-query',
}

export const useDictionaryItems = (
  params: Partial<DictionaryItemParams>,
  options?: UseQueryOptions<PageResponse<DictionaryItemRecord>>,
) => {
  const queryInfo = useQuery<PageResponse<DictionaryItemRecord>>(
    [ServerStateKeysEnum.query, params],
    () => DictionaryItemService.query(params),
    options,
  );
  return queryInfo;
};

export const useDictionaryItemMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation(
    (req: Partial<DictionaryItemRequest>) => {
      const submit = req.id ? DictionaryItemService.update : DictionaryItemService.create;
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

export const useDictionaryItemDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<DictionaryItemRequest>) => {
      return DictionaryItemService.remove(req);
    },
    {
      onMutate: (variables) => {
        Message.loading(`正在${variables.label}数据...`);
      },
      onSuccess: (_, variables) => {
        Message.clear();
        Message.success(`${variables.label}删除成功`);
      },
      onError: (_, variables) => {
        Message.clear();
        Message.error(`${variables.label}删除失败`);
      },
    },
  );

  const confirmRemove = (record: Partial<DictionaryItemRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选菜单?',
      content: `删除后，${record.label}将被清空，且无法恢复`,
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
