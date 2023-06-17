'use client';

import { useServerInsertedHTML } from 'next/navigation';

import { useStyledComponentsRegistry } from '~/lib/styled-components';

export default function RootStyleRegistry({ children }) {
  const [StyledComponentsRegistry, styledComponentsFlushEffect] = useStyledComponentsRegistry();

  useServerInsertedHTML(() => <>{styledComponentsFlushEffect()}</>);
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
}
