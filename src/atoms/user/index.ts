import { LoginResponse } from '@/pages/auth/login/type';
import { atom } from 'recoil';

export const userInfoState = atom<LoginResponse>({
  key: 'userState',
  default: {
    id: '',
    username: 'user',
    avatar: '',
    token: '',
  },
});
