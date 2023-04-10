function useStorePathValue() {
  const storage = globalThis?.sessionStorage;
  if (!storage) return '/';
  const prevPath = storage.getItem('currentPath');
  // 이전 url을 가져와서 prevPath로 저장
  storage.setItem('prevPath', prevPath);
  // 현재 url을 currentPath로 저장
  console.log('이전페이지 함수실행');
  storage.setItem('currentPath', globalThis.location.pathname);
  return prevPath;
}
export default useStorePathValue;
