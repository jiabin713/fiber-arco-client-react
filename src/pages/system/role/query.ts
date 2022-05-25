import * as RoleService from './service';

import { Message, Modal } from '@arco-design/web-react';
import { QueryObserverOptions, useQuery, useQueryClient } from 'react-query';
import { RoleParams, RoleRecord, RoleRequest } from './type.d';

import { PageResponse } from '@/types/global';
import { useMutation } from 'react-query';

export enum ServerStateKeysEnum {
  query = 'role-query',
}

export const useRoles = (params: Partial<RoleParams>, options?: QueryObserverOptions<PageResponse<RoleRecord>>) => {
  const queryInfo = useQuery<PageResponse<RoleRecord>>(
    [ServerStateKeysEnum.query, params],
    () => RoleService.query(params),
    options,
  );
  return queryInfo;
};

export const useRoleMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation(
    (req: Partial<RoleRequest>) => {
      const submit = req.id ? RoleService.update : RoleService.create;
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

export const useRoleMenuMutation = () => {
  return useMutation(
    (req: Partial<RoleRequest>) => {
      const submit = req.id ? RoleService.update : RoleService.create;
      return submit(req);
    },
    {
      onMutate: () => {
        Message.loading(`正在给角色授权菜单数据...`);
      },
      onSuccess: () => {
        Message.clear();
        Message.success(`授权成功`);
      },
      onError: () => {
        Message.clear();
        Message.error(`授权失败`);
      },
    },
  );
};

export const useRoleDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<RoleRequest>) => {
      return RoleService.remove(req);
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

  const confirmRemove = (record: Partial<RoleRecord>, onSuccess: () => boolean) => {
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
