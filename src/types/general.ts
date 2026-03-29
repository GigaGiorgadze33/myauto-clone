export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export type FetchState<T> =
	| { status: 'idle'; data: null; error: null }
	| { status: 'loading'; data: T | null; error: null }
	| { status: 'success'; data: T; error: null }
	| { status: 'error'; data: T | null; error: Error };
