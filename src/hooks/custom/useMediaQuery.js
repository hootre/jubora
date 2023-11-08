'use client';

import { useMediaQuery } from 'react-responsive';
import useIsClient from './useIsClient';

function Mobile({ children }) {
  const isClient = useIsClient();
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
  return isClient && isMobile ? children : null;
}
function Tablet({ children }) {
  const isClient = useIsClient();
  const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 800 });
  return isClient && isTablet ? children : null;
}
function PC({ children }) {
  const isClient = useIsClient();
  const isPc = useMediaQuery({
    query: '(min-width:768px) ',
  });
  return isClient && isPc ? children : null;
}

export { Mobile, Tablet, PC };
