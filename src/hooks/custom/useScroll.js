import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const listener = () => {
    setScrollY(window.screenY);
  };
  const delay = 15;
  useEffect(() => {
    window.addEventListener('scroll', debounce(listener, delay));
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return {
    scrollY,
  };
}

export default useScroll;
