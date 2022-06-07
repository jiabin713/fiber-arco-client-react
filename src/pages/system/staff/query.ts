import * as StaffService from './service';

import { Message, Modal } from '@arco-design/web-react';
import { StaffParams, StaffRecord, StaffRequest } from './type';
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';

import { PageResponse } from '@/types/global';
import { useMutation } from 'react-query';

export enum ServerStateKeysEnum {
  query = 'staff-query',
}

export const useStaffs = (params: Partial<StaffParams>, options?: UseQueryOptions<PageResponse<StaffRecord>>) => {
  const queryInfo = useQuery<PageResponse<StaffRecord>>(
    [ServerStateKeysEnum.query, params],
    () => StaffService.query(params),
    options,
  );
  return queryInfo;
};

export const useStaffMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation(
    (req: Partial<StaffRequest>) => {
      const submit = req.id ? StaffService.update : StaffService.create;
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

export const useStaffDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<StaffRequest>) => {
      return StaffService.remove(req);
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

  const confirmRemove = (record: Partial<StaffRecord>, onSuccess: () => boolean) => {
    Modal.confirm({
      title: '确认删除当前所选用户?',
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
