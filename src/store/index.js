import { create } from 'zustand';
const useTemplatesStore = create((set) => ({
  // 제품 현재 정렬
  templateSortType: '최신순',

  // 제품 리스트 필터 on/off
  isCurrentFilter: false,
  actions: {
    setTemplateSortType: (state) => set({ templateSortType: state }),

    setIsCurrentFilter: () => {
      set((state) => ({ isCurrentFilter: !state.isCurrentFilter }));
    },
  },
}));

// state
export const useIsCurrentFilter = () => useTemplatesStore((state) => state.isCurrentFilter);
export const useTemplateSortType = () => useTemplatesStore((state) => state.templateSortType);
// action
export const useTemplatesActions = () => useTemplatesStore((state) => state.actions);
