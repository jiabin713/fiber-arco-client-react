import * as MenuService from './service';

import { MenuParams, MenuRecord, MenuRequest } from './type';
import { Message, Modal } from '@arco-design/web-react';
import { QueryObserverOptions, useQuery, useQueryClient } from 'react-query';

import { useMutation } from 'react-query';

export enum ServerStateKeysEnum {
  query = 'menu-query',
}

export const useMenus = (params: Partial<MenuParams>, options?: QueryObserverOptions<MenuRecord[]>) => {
  const queryInfo = useQuery<MenuRecord[]>(
    [ServerStateKeysEnum.query, params],
    () => MenuService.queryTree(params),
    options,
  );
  return {
    ...queryInfo,
    // treeData: queryInfo.data?.con({ id: '1', name: '顶级', status: 'enable' } as MenuRecord),
    treeData: [{ id: '1', name: '顶级菜单', status: 'enable' }].concat(queryInfo.data || []),
  };
};

export const useMenuMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation(
    (req: Partial<MenuRequest>) => {
      const submit = req.id ? MenuService.update : MenuService.create;
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

export const useMenuDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<MenuRequest>) => {
      return MenuService.remove(req);
    },
    {
      onMutate: (variables) => {
        Message.loading(`正在${variables.name}数据...`);
      },
      onSuccess: (_, variables) => {
        Message.clear();
        Message.success(`${variables.name}删除成功`);
        queryClient.invalidateQueries(ServerStateKeysEnum.query);
      },
      onError: (_, variables) => {
        Message.clear();
        Message.error(`${variables.name}删除失败`);
      },
    },
  );

  const confirmRemove = (record: Partial<MenuRecord>) => {
    Modal.confirm({
      title: '确认删除当前所选菜单?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () => deleteMutation.mutate(record),
    });
  };

  return { deleteMutation, confirmRemove };
};
