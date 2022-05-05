import { useCallback, useState } from 'react';

/**
 * This is a fairly standard way to do API calls in react.
 * This is the pattern that GraphQL uses
 * You pass in a function and it returns a function, as well as the result, loading state etc.
 * @param fn
 * @returns
 */
export function useLoading<TInput extends Array<unknown>, TOutput>(
    fn: (...input: TInput) => Promise<TOutput>
): {
    loadingFn: (...input: TInput) => void;
    result?: TOutput;
    isLoading: boolean;
    error?: string; //nb. you can extend the the functionality of this hook so that you return an error object instead, which can be useful
    // But it makes the function look a little more arcane.
} {
    const [result, setResult] = useState<TOutput | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const loadingFn = useCallback(
        async (...input: TInput) => {
            try {
                setIsLoading(true);
                const result = await fn(...input);

                setResult(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : JSON.stringify(err))
            } finally {
                setIsLoading(false);
            }
        },
        [fn]
    );

    return {
        loadingFn: loadingFn,
        result: result,
        isLoading,
        error
    };
}
