import * as AuthService from './service';

import { LoginRequest } from './type.d';
import { Message } from '@arco-design/web-react';
import { useMutation } from 'react-query';

export const useLoginMutation = (title: string = '登录') => {
  return useMutation(
    (req: Partial<LoginRequest>) => {
      const submit = AuthService.login;
      return submit(req);
    },
    {
      onMutate: () => {
        Message.loading(`正在${title}...`);
      },
      onSuccess: () => {
        Message.clear();
        Message.success(`${title}成功`);
      },
      onError: () => {
        Message.clear();
        Message.error(`${title}失败`);
      },
    },
  );
};
