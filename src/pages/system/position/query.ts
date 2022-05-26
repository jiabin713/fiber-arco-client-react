import * as PositionService from './service';

import { Message, Modal } from '@arco-design/web-react';
import { PositionParams, PositionRecord, PositionRequest } from './type.d';
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';

import { PageResponse } from '@/types/global';
import { useMutation } from 'react-query';

export enum ServerStateKeysEnum {
  query = 'position-query',
}

export const usePositions = (
  params: Partial<PositionParams>,
  options?: UseQueryOptions<PageResponse<PositionRecord>>,
) => {
  const queryInfo = useQuery<PageResponse<PositionRecord>>(
    [ServerStateKeysEnum.query, params],
    () => PositionService.query(params),
    options,
  );
  return queryInfo;
};

export const usePositionMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation(
    (req: Partial<PositionRequest>) => {
      const submit = req.id ? PositionService.update : PositionService.create;
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

export const usePositionDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<PositionRequest>) => {
      return PositionService.remove(req);
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

  const confirmRemove = (record: Partial<PositionRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选职位?',
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
