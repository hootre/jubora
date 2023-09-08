import { create } from 'zustand';
const useTemplatesStore = create((set) => ({
  // 로그인/로그아웃 상태관리
  authState: false,
  // 제품 현재 정렬
  templateSortType: '최신순',
  // 현재 태그리스트
  templateTagList: [],
  templateSearchText: '',
  // 제품 리스트 필터 on/off
  isCurrentFilter: false,
  // header 스크롤 이벤트 상태저장
  isHeaderScrollActive: false,

  actions: {
    // 삭제
    setDeleteTemplateTagList: (id) => {
      set((prev) => ({
        templateTagList: prev.templateTagList.filter((tag) => tag.id != id),
      }));
    },
    // 추가
    setAddTemplateTagList: (state) => {
      set((prev) => ({
        templateTagList: [...prev.templateTagList, state],
      }));
    },
    setTemplateSearchText: (state) => set({ templateSearchText: state }),
    setTemplateSortType: (state) => set({ templateSortType: state }),

    setIsCurrentFilter: () => {
      set((state) => ({ isCurrentFilter: !state.isCurrentFilter }));
    },
    setAuthState: () => {
      set((state) => ({ authState: !state.authState }));
    },

    setIsHeaderScrollActive: (state) => set({ templateSortType: state }),
  },
}));

// state
export const useAuthState = () => useTemplatesStore((state) => state.authState);
export const useTemplateSortType = () => useTemplatesStore((state) => state.templateSortType);
export const useIsCurrentFilter = () => useTemplatesStore((state) => state.isCurrentFilter);
export const useTemplateSearchText = () => useTemplatesStore((state) => state.templateSearchText);
export const useTemplateTagList = () => useTemplatesStore((state) => state.templateTagList);
export const useIsHeaderScrollActive = () =>
  useTemplatesStore((state) => state.isHeaderScrollActive);

// action
export const useTemplatesActions = () => useTemplatesStore((state) => state.actions);
