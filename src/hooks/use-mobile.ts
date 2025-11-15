import { useViewportSize } from '@mantine/hooks';


const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const { width } = useViewportSize();

  const isMobile = width < MOBILE_BREAKPOINT

  return !!isMobile
}
