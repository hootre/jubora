import { atom } from 'recoil';

export const curCategoryState = atom({
  key: 'curCategoryState',
  default: 0,
});
export const isCurFilterState = atom({
  key: 'isCurFilterRecoil',
  default: false,
});
export const detailFilterState = atom({
  key: 'detailFilterState',
  default: 0,
});
export const detailFilterkeywordState = atom({
  key: 'detailFilterkeywordState',
  default: { keyword: { state: false } },
});

// Auth
export const authState = atom({
  key: 'authState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const isAuthLoding = atom({
  key: 'isAuthLoding',
  default: false,
});
