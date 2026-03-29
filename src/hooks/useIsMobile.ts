import { useMediaQuery } from './useMediaQuery';

export const useIsMobile = (): boolean => {
	const matches = useMediaQuery('(width < 64rem)');

	return matches;
};
