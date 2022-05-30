import { menuTreeQuery } from '@/atoms/menu';
import { useRecoilValueLoadable } from 'recoil';

export const useMenuTree = () => {
  const loadable = useRecoilValueLoadable(menuTreeQuery);
  switch (loadable.state) {
    case 'hasValue':
      return loadable.contents;
    case 'loading':
      return [];
    case 'hasError':
      throw [];
  }
};
