import type { FetchState } from '@/types/general';
import {
	useState,
	useCallback,
	useTransition,
	useRef,
	type RefObject,
} from 'react';

export type UseFetchReturn<T, Args extends unknown[]> = {
	state: FetchState<T>;
	execute: (args?: { args: Args; customStoreKey?: string }) => Promise<void>;
	refetch: () => Promise<void>;
	isPending: boolean;
	restoreFromCache: () => void;
	reset: () => void;
	abortController: RefObject<AbortController | null>;
};

const createIdleState = <T>(): FetchState<T> => ({
	status: 'idle',
	data: null,
	error: null,
});

const store = new Map<string, unknown>(
	localStorage.getItem('fetchCache')
		? JSON.parse(localStorage.getItem('fetchCache') as string)
		: []
);

export function useFetch<T, Args extends unknown[]>(
	fetcher: (...args: Args) => Promise<T>,
	storeKey?: string,
	appendDataUsing?: (prevData: T | null, newData: T) => T
): UseFetchReturn<T, Args> {
	const [state, setState] = useState<FetchState<T>>(createIdleState<T>());
	const [isPending, startTransition] = useTransition();

	const lastArgs = useRef<Args | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const execute: UseFetchReturn<T, Args>['execute'] = useCallback(
		async (params) => {
			const { args, customStoreKey } = params ?? {};
			const storeKeyToUse = customStoreKey ?? storeKey;
			if (storeKeyToUse && store.has(storeKeyToUse)) {
				setState({
					status: 'success',
					data: store.get(storeKeyToUse) as T,
					error: null,
				});
				return;
			}
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}

			const controller = new AbortController();
			abortControllerRef.current = controller;
			if (args) {
				lastArgs.current = args;
			}

			setState((prev) => ({
				...prev,
				status: 'loading',
				error: null,
			}));

			startTransition(async () => {
				try {
					const data = await fetcher(...(args ?? ([] as unknown as Args)));

					if (controller.signal.aborted) return;

					setState((prev) => {
						const formattedData = appendDataUsing
							? appendDataUsing(prev.data ?? null, data)
							: data;
						if (storeKeyToUse) {
							store.set(storeKeyToUse, formattedData);
							localStorage.setItem(
								'fetchCache',
								JSON.stringify(Array.from(store.entries()))
							);
						}
						return {
							...prev,
							status: 'success',
							data: formattedData,
							error: null,
						};
					});
				} catch (err) {
					if (controller.signal.aborted) return;

					setState({
						status: 'error',
						data: null,
						error: err instanceof Error ? err : new Error(String(err)),
					});
				}
			});
		},
		[fetcher, storeKey, appendDataUsing]
	);

	const refetch = useCallback(async () => {
		if (lastArgs.current) {
			await execute({ args: lastArgs.current });
		}
	}, [execute]);

	const reset = useCallback(() => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		lastArgs.current = null;
		setState(createIdleState<T>());
	}, []);

	const restoreFromCache = useCallback(() => {
		if (storeKey && store.has(storeKey)) {
			setState({
				status: 'success',
				data: store.get(storeKey) as T,
				error: null,
			});
		}
	}, [storeKey]);

	return {
		state,
		execute,
		refetch,
		isPending,
		restoreFromCache,
		reset,
		abortController: abortControllerRef,
	};
}
