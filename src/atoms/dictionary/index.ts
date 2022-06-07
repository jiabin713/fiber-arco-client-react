import * as DictionaryService from '@/pages/system/dictionary/service';

import { selectorFamily } from 'recoil';

export const enum StatusEnum {
  enable = 'enable',
  disable = 'disable',
}

// export const dictCodeState = atom({
//   key: 'codeState',
//   default: 'system_status',
// });

export const dictListQuery = selectorFamily({
  key: 'dictListQuery',
  get: (code: string) => async () => {
    const data = await DictionaryService.queryItems(code);
    const filterData = data.filter((item) => item.status != StatusEnum.disable);
    return filterData;
  },
});

// export const dictListActive = selector({
//   key: 'dictListActive',
//   get: ({ get }) => {
//     const data = get(dictListQuery(get(dictCodeState)));
//     const filterData = data.filter((item) => item.status != StatusEnum.disable);
//     return filterData;
//   },
// });
