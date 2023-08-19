import { useState, useEffect } from 'react';

/**
 * 이미지의 load 상태를 파악하는 커스텀 hook
 * @param ref load 상태를 파악하고자 하는 대상
 * @returns 이미지 load 상태
 */
export function useImgLoadStatus(ref) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  // ref가 아닌 src를 dependency로 가진다.
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // 한번 load된 상태이기 때문에 isImgLoaded가 true로 되어 있는데,
    // 그 것을 초기화하여, 새로운 이미지로 변경되고 있음을 보여준다.
    if (isImgLoaded) {
      setIsImgLoaded(false);
    }

    const updateStatus = (img) => {
      const isLoaded = img.complete && img.naturalHeight !== 0;

      setIsImgLoaded(isLoaded);
    };

    ref.current.addEventListener('load', () => updateStatus(ref.current), { once: true });
  }, []);

  return isImgLoaded;
}
