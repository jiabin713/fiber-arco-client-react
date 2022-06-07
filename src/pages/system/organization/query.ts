import * as OrganizationService from './service';

import { Message, Modal } from '@arco-design/web-react';
import { OrganizationParams, OrganizationRecord, OrganizationRequest } from './type';
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';

import { useMutation } from 'react-query';

export enum ServerStateKeysEnum {
  query = 'organization-query',
}

export const useOrganizations = (
  params: Partial<OrganizationParams>,
  options?: UseQueryOptions<OrganizationRecord[]>,
) => {
  const queryInfo = useQuery<OrganizationRecord[]>(
    [ServerStateKeysEnum.query, params],
    () => OrganizationService.queryTree(params),
    options,
  );
  return {
    ...queryInfo,
    treeData: [{ id: '1', name: '顶级组织', status: 'enable' }].concat(queryInfo.data || []),
  };
};

export const useOrganizationMutation = (title: string = '新增') => {
  const queryClient = useQueryClient();
  return useMutation(
    (req: Partial<OrganizationRequest>) => {
      const submit = req.id ? OrganizationService.update : OrganizationService.create;
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

export const useOrganizationDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<OrganizationRequest>) => {
      return OrganizationService.remove(req);
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

  const confirmRemove = (record: Partial<OrganizationRecord>) => {
    Modal.confirm({
      title: '确认删除当前所选组织?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () => deleteMutation.mutateAsync(record),
    });
  };

  return { deleteMutation, confirmRemove };
};
