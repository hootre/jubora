import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    window.addEventListener('scroll', () => {
      if (mounted) {
        setScrollY(window.scrollY);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
      //   window.removeEventListener('scroll', debounce(listener, delay));
    };
  }, []);

  return {
    scrollY,
  };
}
