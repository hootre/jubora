import { create } from 'zustand';
const useTemplatesStore = create((set) => ({
  // 제품 리스트 필터 on/off
  isCurrentFilter: false,
  // 제품 상세 필터(최신순, 날짜순, 판매순)
  detailFilterState: 0,
  // 제품 카테고리 필터
  categoryFilterState: 0,
  actions: {
    setIsCurrentFilter: () => {
      set((state) => ({ isCurrentFilter: !state.isCurrentFilter }));
    },
    setDetailFilterState: (state) => set({ detailFilterState: state }),
  },
}));

export const useIsCurrentFilter = () => useTemplatesStore((state) => state.isCurrentFilter);
export const useDetailFilterState = () => useTemplatesStore((state) => state.detailFilterState);

export const useTemplatesActions = () => useTemplatesStore((state) => state.actions);
