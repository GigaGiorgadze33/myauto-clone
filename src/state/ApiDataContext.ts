import { createContext, useContext } from 'react';
import type { ApiDataContextValue } from './types';

export const ApiDataContext = createContext<ApiDataContextValue | undefined>(
	undefined
);

export const useApiData = () => {
	const context = useContext(ApiDataContext);
	if (!context) {
		throw new Error('use the api data context inside the provider');
	}
	return context;
};
