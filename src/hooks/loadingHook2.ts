import { useCallback, useState } from 'react';
import { BooleanLiteral } from 'typescript';

/**
 * This is a fairly standard way to do API calls in react.
 * This is the pattern that GraphQL uses
 * You pass in a function and it returns a function, as well as the result, loading state etc.
 * @param fn
 * @returns
 */
export function useLoading2<TInput extends Array<unknown>, TOutput>(
    fn: (...input: TInput) => Promise<TOutput>
): {
    loadingFn: (id: string, ...input: TInput) => void;
    result?: Record<string, TOutput>;

    isLoading: Record<string, boolean>;
    error?: Record<string, string>; //nb. you can extend the the functionality of this hook so that you return an error object instead, which can be useful
    // But it makes the function look a little more arcane.


    isAnyLoading: boolean;
    doesAnyHaveError: boolean;
} {
    const [result, setResult] = useState<Record<string, TOutput>>({});
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<Record<string, string>>({});

    const loadingFn = useCallback(
        async (id: string, ...input: TInput) => {

            try {

                setIsLoading((l) => ({
                    ...l,
                    [id]: true,
                }));
                const thisResult = await fn(...input);

                setResult((r) => ({ ...r, [id]: thisResult }));
            } catch (err) {


                const thisErr = err instanceof Error ? err.message : JSON.stringify(err)
                setError((e) => ({
                    ...e,
                    [id]: thisErr
                }));
            } finally {

                 setIsLoading((l) => ({
                    ...l,
                    [id]: false,
                }));
            }
        },
        [fn]
    );

    return {
        loadingFn: loadingFn,
        result: result,
        isLoading,
        error,
        isAnyLoading: Object.values(isLoading).some(v => v),
        doesAnyHaveError: Object.values(error).some(v => !!v),
    };
}
