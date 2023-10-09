import { useState } from "react";

export const useFetching = (callback: <T>(...args: T[]) => void) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const fetchData = async <T>(...args: T[]) => {
		try {
			setIsLoading(true)
			await callback(...args)
		} catch (e) {
			setError((e as Error).message);
		} finally {
			setIsLoading(false)
		}
	}

	return { fetchData, isLoading, error }
}
