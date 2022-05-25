import { DictionaryItemRecord } from '@/pages/system/dictionary-item/type';
import { dictListQuery } from '@/atoms/dictionary/';
import { useRecoilValueLoadable } from 'recoil';

const useOptions = (code: string): [DictionaryItemRecord[], boolean] => {
  const loadable = useRecoilValueLoadable(dictListQuery(code));
  switch (loadable.state) {
    case 'hasValue':
      return [loadable.contents, false];
    case 'loading':
      return [[], true];
    // case 'hasError':
    //   throw loadable.contents;
  }
  return [[], false];
};

export default useOptions;
