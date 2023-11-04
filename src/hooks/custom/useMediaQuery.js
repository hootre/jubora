'use client';

import { useMediaQuery } from 'react-responsive';
import { useIsClient } from './useIsClient';

const Mobile = ({ children }) => {
  const isClient = useIsClient();
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
  return isClient && isMobile ? children : null;
};
const Tablet = ({ children }) => {
  const isClient = useIsClient();
  const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 800 });
  return isClient && isTablet ? children : null;
};
const PC = ({ children }) => {
  const isClient = useIsClient();
  const isPc = useMediaQuery({
    query: '(min-width:768px) ',
  });
  return isClient && isPc ? children : null;
};

export { Mobile, Tablet, PC };
